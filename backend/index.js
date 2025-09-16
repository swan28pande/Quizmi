import express from "express";
import cors from "cors";

import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

// load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI();

// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.get("/api/questions/:topic", async (req, res) => {
  const topic = req.params.topic;
  // const provider = req.query.provider || "openai"; // 'openai' or 'gemini'
  const provider = "gemini";
  const prompt = `Generate 3 easy, 3 medium and 3 hard multiple choice questions (MCQs) on the topic "${topic}". Format the response as a JSON array of objects, each with 'question', 'options' (array of 4) Do not mention 'A','B','C'. And give Answer to the question as answer field. If the questions are offensive or inappropriate, return "unable to provide mcqs"`;

  try {
    let questions = [];
    if (provider === "gemini") {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
      const result = await model.generateContent(prompt);
      const content = result.response.text();
    
      // check refusal phrase first and respond with message string
      console.log(content);
      if (
        content.toLowerCase().includes("unable to provide mcqs") ||
        content.toLowerCase().includes("unable to create responses")
      ) {
        return res.json("I am programmed to be a harmless AI assistant. I am unable to provide MCQs on this topic.");
      }

      try {
        questions = JSON.parse(content);
      } catch (e) {
        const match = content.match(/\[.*\]/s);
        if (match) {
          questions = JSON.parse(match[0]);
        } else {
          return res.status(500).json({ error: "Failed to parse questions from Gemini response." });
        }
      }
      return res.json(questions);
    } else {
      // Use OpenAI
      const response = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a helpful quiz generator." },
          { role: "user", content: prompt },
        ],
        max_tokens: 600,
      });
      const content = response.choices[0].message.content;

      if (
        content.toLowerCase().includes("unable to provide mcqs") ||
        content.toLowerCase().includes("unable to create responses")
      ) {
        return res.json("I am programmed to be a harmless AI assistant. I am unable to provide MCQs on this topic.");
      }

      try {
        questions = JSON.parse(content);
      } catch (e) {
        const match = content.match(/\[.*\]/s);
        if (match) {
          questions = JSON.parse(match[0]);
        } else {
          return res.status(500).json({ error: "Failed to parse questions from OpenAI response." });
        }
      }
      return res.json(questions);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to fetch questions from ${provider}.` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
