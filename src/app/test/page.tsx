"use client";

import { model } from "@/api/gemini";
import { useState } from "react";
import { final } from "@/components/req";
import { chats } from "@/utils/chats";
import { useRef } from "react";

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

  // Audio recording

  const audioRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    audioRef.current = mediaRecorder;

    mediaRecorder.start();
    setIsRecording(true);

    mediaRecorder.ondataavailable = (event) => {
      const audioBlob = new Blob([event.data], { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);
      console.log("Audio URL:", audioUrl);
      // You can upload the audioBlob to your server here
    };

    mediaRecorder.onstop = () => {
      setIsRecording(false);
    };
  };

  const stopRecording = () => {
    if (audioRef.current) {
      audioRef.current.stop();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <div className="h-[95%] w-1/2">
        <div className="flex flex-col items-center h-[95%] w-full justify-center"></div>
        <div className="flex justify-center gap-5 h-[5%] w-full">
          <input
            className="w-max"
            type="text"
            placeholder="Ask me anything..."
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
          />
          <button
            className="bg-black text-white p-4 rounded-md hover:bg-[#444] transition-all flex items-center justify-center"
            onClick={() => {
              getChat(prompt);
              chats.push(`user : ${prompt}`);
              setPrompt("");
            }}
          >
            Send
          </button>
          <input
            type="file"
            className="hidden"
            id="fileInput"
            onChange={(e) => {
              // Handle file input
            }}
          />
          <label
            htmlFor="fileInput"
            className="bg-yellow-500 text-white p-4 rounded-md hover:bg-yellow-700 transition-all flex items-center justify-center cursor-pointer"
          >
            Upload File
          </label>

          <button
            className={`bg-blue-500 text-white p-4 rounded-md hover:bg-blue-700 transition-all flex items-center justify-center ${
              isRecording ? "bg-red-500" : ""
            }`}
            onClick={() => {
              if (isRecording) {
                stopRecording();
              } else {
                startRecording();
              }
            }}
          >
            {isRecording ? "Stop Recording" : "Record Audio"}
          </button>
        </div>
      </div>
    </div>
  );
}
