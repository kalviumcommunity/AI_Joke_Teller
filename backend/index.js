require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODEL = "gemini-1.5-flash";

// ----------------- SYSTEM PROMPT -----------------
const SYSTEM_PROMPT = `
You are a stand-up comedian AI.
Your job is to tell short, funny, safe-for-work jokes.
Make them light-hearted and easy to understand.
Always return ONLY the joke, no explanations.
Maximum 2 sentences.
⚠️ Important: Always make the joke DIFFERENT each time.
Never repeat the exact same joke wording.
Use variety and creativity!
DONT GIVE THIS 👉 Why do programmers prefer dark mode? Because light attracts bugs!
`;

// ----------------- ROUTES -----------------
app.post("/generate", async (req, res) => {
  try {
    const { category, style } = req.body;

    // Add randomness with a session seed
    const randomizer = Math.floor(Math.random() * 10000);

    // build USER PROMPT
    let userPrompt = `Tell me a Different ${category} joke.`;
    if (style) {
      userPrompt += ` Make it in a ${style} style.`;
    }
    userPrompt += ` Randomness code: ${randomizer}`;

    // Combine SYSTEM + USER prompt
    const finalPrompt = `${SYSTEM_PROMPT}\n\nUser request: ${userPrompt}`;

    const model = genAI.getGenerativeModel({ model: MODEL });
    const result = await model.generateContent(finalPrompt);

    const joke = result.response.text();
    res.json({ joke });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Server
const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
