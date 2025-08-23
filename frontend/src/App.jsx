import { useState } from "react";
import "./App.css"; // import CSS file

export default function App() {
  const [category, setCategory] = useState("Programming");
  const [style, setStyle] = useState("");
  const [strategy, setStrategy] = useState("zero");
  const [joke, setJoke] = useState("");

  const generateJoke = async () => {
    const res = await fetch("http://localhost:3001/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category, style, strategy }),
    });
    const data = await res.json();
    setJoke(data.joke || "No joke found 😅");
  };

  return (
    <div className="container">
      <h1 className="title">😂 AI Joke Generator</h1>

      <div className="form">
        <input
          className="input"
          placeholder="Category (e.g. Dad, Programming, Animals)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          className="input"
          placeholder="Style (optional)"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        />

        <select
          className="select"
          value={strategy}
          onChange={(e) => setStrategy(e.target.value)}
        >
          <option value="zero">Zero-Shot</option>
          <option value="one">One-Shot</option>
          <option value="multi">Multi-Shot</option>
          <option value="reasoned">Reasoned</option>
        </select>

        <button onClick={generateJoke} className="button">
          Generate Joke
        </button>
      </div>

      {joke && (
        <div className="joke-box">
          <h2 className="joke-title">Your Joke:</h2>
          <p>{joke}</p>
        </div>
      )}
    </div>
  );
}
