"use client";

import { model } from "@/api/gemini";
import { useState } from "react";
import { final } from "@/components/req";
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
      const result = await chat.sendMessage(prompt);
      console.log(result.response.text());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <input
        type="text"
        placeholder="Ask me anything..."
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
      />
      <button onClick={() => getChat(prompt)}>Get Chat</button>
    </div>
  );
}
