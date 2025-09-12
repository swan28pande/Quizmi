import express from 'express';
import cors from 'cors';
import OpenAI from "openai";


//load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

const client = new OpenAI();
const app = express();
const PORT = 3000;



app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

app.get('/api/questions/:topic', async (req, res) => {
    const topic = req.params.topic;
    try {
        // Prompt for OpenAI to generate 3 MCQs for the topic
        const prompt = `Generate 3  multiple choice questions (MCQs) on the topic "${topic}". Format the response as a JSON array of objects, each with 'question', 'options' (array of 4) Do not mention 'A','B','C'. and 'answer' fields.`;
        const response = await client.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are a helpful quiz generator." },
                { role: "user", content: prompt }
            ],
            max_tokens: 600
        });
        // Try to parse the response as JSON
        let questions = [];
        const content = response.choices[0].message.content;
        try {
            questions = JSON.parse(content);
        } catch (e) {
            // If not valid JSON, try to extract JSON from the response
            const match = content.match(/\[.*\]/s);
            if (match) {
                questions = JSON.parse(match[0]);
            } else {
                return res.status(500).json({ error: "Failed to parse questions from OpenAI response." });
            }
        }
        console.log(questions);
        res.json(questions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch questions from OpenAI." });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});