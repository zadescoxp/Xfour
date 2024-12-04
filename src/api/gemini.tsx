import { GoogleGenerativeAI } from "@google/generative-ai";

const genai = new GoogleGenerativeAI("AIzaSyD6_bLZoEi8Ve8mn3tbIm5Zwe4mxqBMTfI");
const model = genai.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `
    Role: AI chatbot to help students
    Data: You will be provided with the whole information of the student about their name, age, gender, disability, language, pace of learning, interest
    Duty: By understading the person's condition you have to suggest them what should they learn at this age, help them to learn, suggest content, and answer question in a very simple manner
    Check: You have to check the person's knowledge about any topic and help them to understand the topic in a very simple manner. If you think they lack somewhere let them know.
    Output: Generate a structured response to help users understand the concepts clearly
    Language: Whatever the users feels good with you will get to know what language they are comfortable with
        `,
});
// const chat = model.startChat({
//     history: [
//       {
//         role: "user",
//         parts: [{ text: "Hello" }],
//       },
//       {
//         role: "model",
//         parts: [{ text: "Great to meet you. What would you like to know?" }],
//       },
//     ],
//   });
//   let result = await chat.sendMessageStream("I have 2 dogs in my house.");
//   for await (const chunk of result.stream) {
//     const chunkText = chunk.text();
//     process.stdout.write(chunkText);
//   }
//   result = await chat.sendMessageStream("How many paws are in my house?");
//   for await (const chunk of result.stream) {
//     const chunkText = chunk.text();
//     process.stdout.write(chunkText);
//   }

export { model };
