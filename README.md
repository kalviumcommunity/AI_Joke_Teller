# 🤖😂 AI Joke Teller

A fun **MERN stack** project that generates jokes using **Google Gemini AI** with different prompt engineering strategies.

---

## 📌 Project Idea
The **AI Joke Teller** is an interactive web app where users can generate jokes by selecting a category, style, and prompt strategy.  
It demonstrates **prompt engineering concepts** like Zero-shot, One-shot, Multi-shot, Dynamic, and Chain-of-thought prompting.

Users can:
- 🎭 Select joke categories (Programming, Dad jokes, Random).
- 🎨 Add an optional style (punny, dry, wholesome…).
- ⚡ Choose different AI prompting strategies.
- ✅ Evaluate jokes with a custom judging system.

---

## 🛠️ Tech Stack
- **Frontend**: React, TailwindCSS, Framer Motion (UI & animations).  
- **Backend**: Express.js, Node.js.  
- **Database**: (Not required for this version, extendable with MongoDB).  
- **AI Model**: Google Generative AI (`gemini-1.5-flash`).  
- **Evaluation**: Custom JSON Judge (checks category, SFW, length).

---

## 🚀 Features
- Generate original jokes instantly.
- Multiple categories & optional styles.  
- Supports **Zero-shot, One-shot, Multi-shot, Dynamic, and Reasoned prompting**.  
- Evaluation system to check if the joke meets requirements:
  - ✅ Correct category
  - ✅ Safe-for-work (SFW)
  - ✅ Maximum 2 sentences
  - ✅ Non-empty  
- Animated **Aurora-style UI** with recent joke history.  
- Copy jokes with one click.  

---

## ⚙️ How It Works
1. User selects category, style, and strategy on the frontend.  
2. Request sent → Backend builds the **prompt** based on chosen strategy.  
3. Backend calls **Gemini API** → Gets joke → Returns it to frontend.  
4. User can evaluate the joke → Judge system checks and outputs **Pass/Fail** with reasons.

---

