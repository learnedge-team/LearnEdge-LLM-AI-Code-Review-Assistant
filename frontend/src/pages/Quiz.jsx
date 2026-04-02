import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

export default function Quiz({ setXp }) {
  const location = useLocation();
  const navigate = useNavigate();

  const quiz = location.state?.quiz || [];

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [time, setTime] = useState(300);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState("");
  const [levelUp, setLevelUp] = useState(false);

  useEffect(() => {
    if (time <= 0) {
      setShowResult(true);
      return;
    }

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const updateScoreBackend = async (points) => {
    try {
      const token = localStorage.getItem("token");

      await fetch("https://learnedge-backend-raxx.onrender.com/api/leaderboard/update-score", {
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

  const handleAnswer = (option) => {
    const newAnswers = [...answers];
    newAnswers[current] = option;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (current < quiz.length - 1) {
      setCurrent(current + 1);
      setShowHint("");
    } else {
      setShowResult(true);
    }
  };

  const correct = quiz.filter(
    (q, i) => q.answer === answers[i]
  ).length;

  const earnedXP = correct * 5;

  useEffect(() => {
    if (showResult && quiz.length > 0) {
      setXp((prev) => {
        const newXp = prev + earnedXP;

        if (Math.floor(prev / 100) < Math.floor(newXp / 100)) {
          setLevelUp(true);
          setTimeout(() => setLevelUp(false), 3000);
        }

        return newXp;
      });

      updateScoreBackend(earnedXP);
    }
  }, [showResult]);

  if (showResult) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white relative">

        <Confetti />

        {levelUp && (
          <div className="absolute top-20 text-3xl font-bold text-yellow-400 animate-bounce">
            🎮 LEVEL UP!
          </div>
        )}

        <h1 className="text-3xl font-bold mb-4">🎉 Quiz Completed</h1>

        <p className="text-lg mb-2">
          Score: {correct} / {quiz.length}
        </p>

        <p className="text-yellow-400 font-bold mb-6 text-xl">
          +{earnedXP} XP Earned
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-500 px-6 py-3 rounded hover:bg-blue-600 transition"
        >
          Back to Dashboard
        </button>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-6">

      <div className="w-full max-w-3xl bg-slate-800/70 backdrop-blur-xl p-8 rounded-2xl 
      shadow-[0_0_40px_rgba(59,130,246,0.2)]">

        <div className="flex items-center justify-between mb-8">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-full border-4 border-blue-400 
            flex items-center justify-center 
            animate-pulse
            shadow-[0_0_20px_rgba(59,130,246,0.6)]">
              ⏱️
            </div>

            <p className="text-lg font-semibold tracking-wide">
              {Math.floor(time / 60)}:
              {String(time % 60).padStart(2, "0")}
            </p>
          </div>

          <div className="w-48 bg-gray-700 h-2 rounded overflow-hidden">
            <div
              className="bg-green-400 h-2 rounded transition-all duration-500 
              shadow-[0_0_10px_rgba(34,197,94,0.7)]"
              style={{
                width: `${((current + 1) / quiz.length) * 100}%`,
              }}
            ></div>
          </div>

        </div>

        <h2 className="text-xl mb-6 font-semibold
        transition-all duration-300
        hover:scale-[1.02]
        hover:drop-shadow-[0_0_15px_rgba(96,165,250,0.6)]">
          Q{current + 1}. {quiz[current]?.q}
        </h2>

        <div className="space-y-3">
          {quiz[current]?.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              className={`block w-full text-left p-4 rounded-lg border transition-all duration-300
              ${
                answers[current] === opt
                  ? "bg-blue-500 border-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.7)] scale-[1.02]"
                  : "bg-slate-800 border-slate-700 hover:border-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:scale-[1.02]"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            const hints = [
              "💡 Think about basics!",
              "🧠 Eliminate wrong options!",
              "⚡ Recall concepts!",
              "📚 You saw this in notes!",
            ];
            const random =
              hints[Math.floor(Math.random() * hints.length)];
            setShowHint(random);
          }}
          className="mt-6 px-5 py-2 rounded-lg
          bg-purple-500 transition-all duration-300
          border border-transparent
          hover:border-purple-300
          hover:shadow-[0_0_25px_rgba(168,85,247,0.8)]
          hover:scale-105
          active:scale-95"
        >
          🐧 Hint
        </button>

        {showHint && (
          <div className="mt-4 bg-white text-black px-4 py-2 rounded-lg shadow-lg 
          animate-fadeIn">
            {showHint}
          </div>
        )}

        <button
          onClick={nextQuestion}
          className="mt-8 w-full px-6 py-3 rounded-lg
          bg-green-500 transition-all duration-300
          border border-transparent
          hover:border-green-300
          hover:shadow-[0_0_30px_rgba(34,197,94,0.9)]
          hover:scale-105
          active:scale-95"
        >
          {current === quiz.length - 1 ? "Finish" : "Next"}
        </button>

      </div>
    </div>
  );
}