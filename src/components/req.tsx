"use client";

import { useState } from "react";
import { languages } from "@/utils/language";
import { redirect } from "next/navigation";

const final = [];
export default function Req() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [disability, setDisability] = useState("");
  const [disabilityType, setDisabilityType] = useState("");
  const [speed, setSpeed] = useState(50);
  const [speedLabel, setSpeedLabel] = useState("");
  const [interest, setInterest] = useState("");
  const [language, setLanguage] = useState("");
  const [complete, setComplete] = useState(false);

  const handleSpeedChange = (value: number) => {
    setSpeed(value);
    if (value <= 20) {
      setSpeedLabel("Very Slow");
    } else if (value <= 40) {
      setSpeedLabel("Slow");
    } else if (value <= 60) {
      setSpeedLabel("Medium");
    } else if (value <= 80) {
      setSpeedLabel("Fast");
    } else {
      setSpeedLabel("Very Fast");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col justify-center h-1/2 w-[25rem] gap-5">
        <h1 className="uppercase text-7xl text-center font-semibold">XFOUR</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <select
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
          }}
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select
          value={disability}
          onChange={(e) => {
            setDisability(e.target.value);
            if (e.target.value === "No") {
              setDisabilityType("");
            }
          }}
        >
          <option value="" disabled>
            Do you have a disability?
          </option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {disability === "Yes" && (
          <select
            value={disabilityType}
            onChange={(e) => {
              setDisabilityType(e.target.value);
            }}
          >
            <option value="" disabled>
              Select Disability Type
            </option>
            <option value="Blind">Blind</option>
            <option value="Deaf">Deaf</option>
            <option value="Down Syndrome">Down Syndrome</option>
            <option value="ADHD">ADHD</option>
            <option value="Autism">Autism</option>
          </select>
        )}
        <input
          type="range"
          min="0"
          max="100"
          value={speed}
          onChange={(e) => handleSpeedChange(Number(e.target.value))}
        />
        <label>{speedLabel}</label>
        <select
          value={interest}
          onChange={(e) => {
            setInterest(e.target.value);
          }}
        >
          <option value="" disabled>
            Select Interest
          </option>
          <option value="Coding">Coding</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Biology">Biology</option>
          <option value="Literature">Literature</option>
          <option value="History">History</option>
          <option value="Civics">Civics</option>
          <option value="Economics">Economics</option>
        </select>

        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
          }}
        >
          <option value="" disabled>
            Select Language
          </option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>

        <button
          className="bg-black text-white p-4 rounded-md hover:bg-[#444] transition-all"
          onClick={() => {
            if (!name) {
              alert("Please enter your name");
            } else if (!age) {
              alert("Please enter your age");
            } else if (!gender) {
              alert("Please select your gender");
            } else if (!disability) {
              alert("Please indicate if you have a disability");
            } else if (disability === "Yes" && !disabilityType) {
              alert("Please select your disability type");
            } else if (!interest) {
              alert("Please select your interest");
            } else if (!language) {
              alert("Please select your language");
            } else {
              setComplete(true);
              console.log(complete);
              final.push(
                name,
                age,
                gender,
                disability,
                disabilityType,
                interest,
                language,
                speedLabel
              );
              redirect("/test");
            }
          }}
        >
          Let&apos;s Go
        </button>
      </div>
    </div>
  );
}

export { final };
