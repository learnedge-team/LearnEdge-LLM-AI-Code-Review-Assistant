import { useState } from "react";

export default function Quiz({ setXp }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);


  const question = {
    text: "What does <p> tag do?",
    options: ["Image", "Paragraph", "Link"],
    answer: "Paragraph",
  };

  const updateScoreBackend = async (points) => {
    try {
      const token = localStorage.getItem("token");

      await fetch("http://localhost:5000/api/leaderboard/update-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ points }),
      });
    } catch (err) {
      console.error("Score sync failed:", err);
    }
  };



  const handleSubmit = () => {
    setSubmitted(true);

    if (selected === question.answer) {
      setXp((prev) => prev + 30);

      // 🔥 Sync with backend
      updateScoreBackend(30);
    }
  };



  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">

      <h1 className="text-2xl mb-6">🧠 Quiz</h1>

      <p className="mb-4">{question.text}</p>

      {question.options.map((opt, i) => (
        <div
          key={i}
          onClick={() => setSelected(opt)}
          className={`p-3 mb-2 rounded cursor-pointer ${selected === opt ? "bg-blue-500" : "bg-slate-700"
            }`}
        >
          {opt}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={submitted}
        className="mt-4 bg-green-500 px-4 py-2 rounded disabled:opacity-50"
      >
        Submit
      </button>

      {submitted && (
        <p className="mt-4">
          {selected === question.answer
            ? "✅ Correct! +30 XP"
            : "❌ Try again"}
        </p>
      )}

    </div>
  );
}