import { useState } from "react";
import axios from "axios";

export default function PrepPlanner() {
  const [form, setForm] = useState({
    domain: "",
    topics: "",
    level: "Beginner",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!form.domain || !form.topics) {
      return alert("Fill all fields");
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login again");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://learnedge-ai-code-review-assistant-final.onrender.com/api/v1/prep-planner",
        {
          student_id: user?.email || user?._id || "Unknown Student",
          domain: form.domain,
          topics: form.topics,
          duration: "1 Day",
          level: form.level.toLowerCase(),
        }
      );

      setResult(res.data);
    } catch (err) {
      console.error("ERROR:", err.response?.data || err.message);
      alert("Failed to generate plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-6">

      <div className="w-full max-w-3xl bg-slate-800/70 backdrop-blur-xl p-8 rounded-2xl 
      shadow-[0_0_40px_rgba(59,130,246,0.2)]">

        <h1 className="text-3xl font-bold mb-6 text-center
        transition-all duration-300
        hover:scale-105
        hover:drop-shadow-[0_0_20px_rgba(96,165,250,0.8)]">
          ⚡ 1-Day Prep Planner
        </h1>

        <div className="grid gap-4 max-w-md mx-auto">

          <input
            placeholder="Domain (e.g. Web Dev)"
            className="p-3 text-black rounded-lg outline-none
            focus:ring-2 focus:ring-blue-400 transition"
            onChange={(e) =>
              setForm({ ...form, domain: e.target.value })
            }
          />

          <input
            placeholder="Topics"
            className="p-3 text-black rounded-lg outline-none
            focus:ring-2 focus:ring-blue-400 transition"
            onChange={(e) =>
              setForm({ ...form, topics: e.target.value })
            }
          />

          <select
            className="p-3 text-black rounded-lg outline-none
            focus:ring-2 focus:ring-blue-400 transition"
            onChange={(e) =>
              setForm({ ...form, level: e.target.value })
            }
          >
            <option>Beginner</option>
            <option>Intermediate</option>
          </select>

          <button
            onClick={handleGenerate}
            className="bg-blue-500 px-6 py-3 rounded-lg 
            transition-all duration-300 ease-out
            border border-transparent
            hover:border-green-400
            hover:shadow-[0_0_30px_rgba(34,197,94,0.9)]
            hover:scale-105
            active:scale-95"
          >
            {loading ? "⚡ Generating AI Plan..." : "Generate Plan"}
          </button>

        </div>

        {result && (
          <div className="mt-10 grid gap-6">

            <div className="bg-slate-800/80 backdrop-blur-lg p-6 rounded-xl border border-slate-700">
              <h2 className="text-2xl font-bold text-blue-400">
                {result.study_plan_title}
              </h2>
            </div>

            <div className="bg-slate-800/80 backdrop-blur-lg p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-semibold mb-6">📅 Daily Timeline</h3>

              <div className="relative border-l-2 border-blue-500 pl-6 space-y-6">

                {Array.isArray(result.daily_schedule) &&
                  result.daily_schedule.map((item, i) => (
                    <div key={i} className="relative">

                      <div className={`absolute -left-[11px] top-2 w-5 h-5 rounded-full border-2 border-white 
                      ${i === 0 ? "bg-green-400" : i === 1 ? "bg-yellow-400" : "bg-purple-400"}
                      `}></div>

                      <div className="bg-slate-700/80 p-4 rounded-lg 
                      transition-all duration-300
                      hover:scale-[1.02]
                      hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">

                        <h4 className="text-blue-400 font-semibold text-lg">
                          {item.time_block}
                        </h4>

                        <p className="text-gray-300 mt-1">
                          <span className="font-semibold">Topic:</span> {item.topic}
                        </p>

                        <p className="text-gray-300">
                          <span className="font-semibold">Tasks:</span> {item.tasks}
                        </p>

                        <p className="text-yellow-400 mt-2">
                          🎯 {item.focus}
                        </p>

                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-slate-800/80 backdrop-blur-lg p-6 rounded-xl border border-slate-700">
              <h3 className="font-semibold mb-2">❓ Important Questions</h3>

              <ul className="space-y-2">
                {result.important_questions.map((q, i) => (
                  <li
                    key={i}
                    className="bg-slate-700 p-3 rounded transition hover:bg-slate-600"
                  >
                    {typeof q === "object" ? (
                      <>
                        <p className="font-semibold">{q.question}</p>
                        <p className="text-sm text-yellow-400">
                          Priority: {q.priority}
                        </p>
                      </>
                    ) : (
                      q
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-xl border border-green-500
            shadow-[0_0_20px_rgba(34,197,94,0.3)]">
              <h3 className="font-semibold mb-2">💡 Tips</h3>
              <p className="text-green-400">{result.tips}</p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}