import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 text-white">

      {/* HERO */}
      <div className="flex flex-col items-center justify-center text-center py-20 px-6">

        <img
          src="/src/assets/pingo-idle.png"
          className="w-24 mb-4 animate-bounce"
        />

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          LearnEdge AI 🚀
        </h1>

        <p className="text-gray-400 max-w-xl mb-6">
          Crack interviews & exams with AI-powered learning, real-time feedback, and smart prep tools.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/prep-planner")}
            className="bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            ⚡ Day Prep Planner
          </button>

          <button
            onClick={() => navigate("/login")}
            className="border px-6 py-3 rounded-lg hover:bg-white hover:text-black"
          >
            Login
          </button>
        </div>
      </div>

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-6 px-10 pb-20">

        <div className="bg-slate-800 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">🧠 AI Code Review</h2>
          <p className="text-gray-400">Get instant feedback on your code.</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">🏆 Leaderboard</h2>
          <p className="text-gray-400">Compete and climb rankings.</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">⚡ Prep Planner</h2>
          <p className="text-gray-400">1-day high intensity strategy.</p>
        </div>

      </div>
    </div>
  );
}