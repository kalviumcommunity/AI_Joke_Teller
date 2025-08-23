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

// ----------------- STRATEGIES -----------------

// Zero-Shot Prompt
function promptZeroShot({ category, style }) {
  return `Write one original ${category} joke. ${style ? `Style: ${style}.` : ''} 
Keep it SFW and <=2 sentences. Don't repeat jokes.`;
}

// // One-Shot Prompt
// function promptOneShot({ category, style }) {
//   return `Here is an example joke:
// "Why don't skeletons fight each other? They don't have the guts."

// Now, write one original ${category} joke. ${style ? `Style: ${style}.` : ''} 
// Keep it funny, SFW, and <=2 sentences.`;
// }

// // Multi-Shot Prompt
// function promptMultiShot({ category, style }) {
//   return `Examples:
// 1. "I asked my dog what's two minus two. He said nothing."
// 2. "Parallel lines have so much in common… it’s a shame they’ll never meet."

// Now, create one new ${category} joke. ${style ? `Style: ${style}.` : ''} 
// Keep it <=2 sentences.`;
// }

// // Reasoned Prompt
// function promptReasoned({ category, style }) {
//   return `Think step by step:
// 1. Recall common setups for ${category} jokes.
// 2. Pick one that is fresh and funny.
// 3. Ensure it's <=2 sentences and SFW.
// 4. Deliver the joke only.

// Now write it ${style ? `in ${style} style.` : ''}`;
// }

// ----------------- ROUTE -----------------
app.post("/generate", async (req, res) => {
  try {
    const { category, style, strategy = "zero" } = req.body;

    // Pick prompt based on strategy
    let finalPrompt;
    switch (strategy) {
    //   case "one":
    //     finalPrompt = promptOneShot({ category, style });
    //     break;
    //   case "multi":
    //     finalPrompt = promptMultiShot({ category, style });
    //     break;
    //   case "reasoned":
    //     finalPrompt = promptReasoned({ category, style });
    //     break;
      default:
        finalPrompt = promptZeroShot({ category, style });
    }

    const model = genAI.getGenerativeModel({ model: MODEL });
    const result = await model.generateContent(finalPrompt);
    const joke = result.response.text();

    res.json({ joke, strategy });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Server
const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
