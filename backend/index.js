import express from 'express';
import cors from 'cors';

import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";


//load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

const client = new OpenAI();

// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const app = express();
const PORT = 3000;



app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello from Express!');
});


app.get('/api/questions/:topic', async (req, res) => {
    const topic = req.params.topic;
    // const provider = req.query.provider || "openai"; // 'openai' or 'gemini'
    const provider = "gemini"
    const prompt = `Generate 3 multiple choice questions (MCQs) on the topic "${topic}". Format the response as a JSON array of objects, each with 'question', 'options' (array of 4) Do not mention 'A','B','C'. And give Answer to the question as answer field.`;
    try {
        let questions = [];
        if (provider === "gemini") {
            // Use Gemini
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
            const result = await model.generateContent(prompt);
            const content = result.response.text();
            console.log(content);

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
            res.json(questions);
        } else {
            // Use OpenAI (default)
            const response = await client.chat.completions.create({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: "You are a helpful quiz generator." },
                    { role: "user", content: prompt }
                ],
                max_tokens: 600
            });
            const content = response.choices[0].message.content;
            try {
                questions = JSON.parse(content);
                console.log("openai");
                console.log(questions);
            } catch (e) {
                const match = content.match(/\[.*\]/s);
                if (match) {
                    questions = JSON.parse(match[0]);
                } else {
                    return res.status(500).json({ error: "Failed to parse questions from OpenAI response." });
                }
            }
            res.json(questions);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Failed to fetch questions from ${provider}.` });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});