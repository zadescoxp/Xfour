"use client";

import { model } from "@/api/gemini";
import { useState } from "react";
import { final } from "@/components/req";
import { chats } from "@/utils/chats";
import { remark } from "remark";
import html from "remark-html";
import matter from "gray-matter";

export default function Test() {
  const name = final[0];
  const age = final[1];
  const gender = final[2];
  const disability = final[3];
  const disabilityType = final[4];
  const interest = final[5];
  const language = final[6];
  const speedLabel = final[7];

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: `I'm ${name} and I'm ${age} years old. I'm a ${gender} with ${
              disability.toLowerCase() == "no"
                ? "no disability"
                : `a disability of ` + disabilityType
            }. I speak ${language} and I'm a ${speedLabel} learner. I've interest in ${interest}`,
          },
        ],
      },
    ],
  });
  const getChat = async (prompt: { prompt: string }) => {
    try {
      setLoading(true);
      const result = await chat.sendMessage(prompt);
      console.log(result.response.text());
      const matterResult = matter(result.response.text());
      const generatedContent = await remark()
        .use(html)
        .process(matterResult.content);
      const contentHTML = generatedContent.toString();
      chats.push({ role: "model", message: `${contentHTML}` });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <div className="h-[95%] w-1/2">
        <div className="flex flex-col items-start overflow-scroll overflow-x-auto gap-5 p-4 h-[95%] w-full">
          {chats.map((chat, index) => {
            return chat.role === "model" ? (
              <div key={index} className="">
                <p className="text-md pl-3 -mb-1">XFOUR</p>
                <p
                  className="text-sm bg-[#e4e4e4] text-black p-4 rounded-md m-2"
                  dangerouslySetInnerHTML={{
                    __html: chat.message,
                  }}
                ></p>
              </div>
            ) : (
              <div key={index} className="">
                <p className="text-md pl-3 -mb-1">{name}</p>
                <p className="text-sm bg-black text-white p-4 rounded-md m-2">
                  {chat.message}
                </p>
              </div>
            );
          })}
          {loading ? <p className="pl-3">Thinking...</p> : ""}
        </div>
        <div className="flex justify-center gap-5 h-[5%] w-full px-4">
          <input
            className="w-full"
            type="text"
            placeholder="Ask me anything..."
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter" && !e.shiftKey) {
                if (prompt.length > 0) {
                  e.preventDefault();
                  getChat(prompt);
                  chats.push({ role: "user", message: prompt });
                  setPrompt("");
                }
              }
            }}
          />
          <button
            className="bg-black text-white p-4 rounded-md hover:bg-[#444] transition-all flex items-center justify-center"
            onClick={() => {
              if (prompt.length > 0) {
                getChat(prompt);
                chats.push({ role: "user", message: prompt });
                setPrompt("");
              }
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
