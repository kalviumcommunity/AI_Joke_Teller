import { useState } from "react";

function App() {
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("coding"); // default

  const getJoke = async () => {
    setLoading(true);
    setJoke("");

    try {
      const res = await fetch("http://localhost:3001/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category }) // send selected category
      });

      const data = await res.json();
      setJoke(data.joke);
    } catch (err) {
      console.error(err);
      setJoke("⚠️ Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎭 AI Joke Generator</h1>
      <p style={styles.subtitle}>
        Pick a category and let AI crack a joke for you!
      </p>

      {/* Dropdown for category selection */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={styles.select}
      >
        <option value="programming">💻 Programming</option>
        <option value="dad">👨 Dad Jokes</option>
         <option value="animal">🐶 Animal Jokes</option>
      </select>

      <button onClick={getJoke} style={styles.button}>
        {loading ? "Generating..." : "Get a Joke 😂"}
      </button>

      <div style={styles.jokeBox}>
        {joke && <p>👉 {joke}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    marginTop: "50px",
    backgroundColor: "#f9f9f9",
    padding: "30px",
    borderRadius: "12px",
    maxWidth: "500px",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)"
  },
  title: {
    fontSize: "28px",
    marginBottom: "10px",
    color: "#333"
  },
  subtitle: {
    fontSize: "16px",
    marginBottom: "20px",
    color: "#666"
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "20px",
    cursor: "pointer"
  },
  button: {
    display: "block",
    margin: "0 auto",
    padding: "12px 25px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px"
  },
  jokeBox: {
    marginTop: "25px",
    fontSize: "18px",
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    boxShadow: "0px 2px 6px rgba(0,0,0,0.05)"
  }
};

export default App;
