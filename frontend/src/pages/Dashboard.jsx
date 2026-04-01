import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import logo from "../assets/companyLogo.png";

export default function Dashboard({ xp, level }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const [leaders, setLeaders] = useState([]);
  const [pingoMessage, setPingoMessage] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const domains = [
    { name: "DSA", route: "/code" },
    { name: "Web Dev", route: "/modules" },
    { name: "Machine Learning", route: "/modules" },
    { name: "Cloud", route: "/modules" },
  ];

  // 🧠 Fetch leaderboard
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/leaderboard")
      .then((res) => setLeaders(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ⚡ Real-time leaderboard
  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("leaderboardUpdate", (data) => {
      setLeaders(data);
    });

    return () => socket.disconnect();
  }, []);

  // 🐧 Pingo AI logic
  useEffect(() => {
    if (xp === 0) {
      setPingoMessage("👋 Hey! Start with a module or try a quiz.");
    } else if (xp < 50) {
      setPingoMessage("🔥 Good start! Try code review for big XP.");
    } else if (xp < 100) {
      setPingoMessage("🚀 You're improving fast! Keep going.");
    } else {
      setPingoMessage("🏆 You're on fire! Check leaderboard!");
    }
  }, [xp]);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <div className="flex items-center gap-0">
          <img src={logo} alt="LearnEdge" className="w-15 h-14 object-contain hover:scale-110 transition" />

          <h1 className="text-3xl font-bold">
            LearnEdge Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-6">

          {/* XP Card */}
          <div className="bg-slate-800 px-4 py-3 rounded-xl border border-slate-700 shadow-md">
            <p className="text-xs text-gray-400">Level {level}</p>

            <p className="text-lg font-bold text-yellow-400">
              ⭐ {xp} XP
            </p>

            <div className="w-36 bg-gray-700 h-2 rounded mt-2">
              <div
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded"
                style={{ width: `${xp % 100}%` }}
              ></div>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition shadow-md"
          >
            Logout
          </button>

        </div>
      </div>

      {/* Greeting */}
      <h2 className="text-lg text-gray-400 mb-6">
        Welcome back 🚀 Keep leveling up!
      </h2>

      {/* Domains */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {domains.map((domain, index) => (
          <div
            key={index}
            onClick={() => navigate(domain.route, { state: { domain: domain.name } })}
            className="relative bg-slate-800 p-6 rounded-xl cursor-pointer 
                       border border-slate-700
                       hover:border-blue-400 
                       hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]
                       hover:-translate-y-1
                       transition-all duration-300"
          >

            {/* Glow */}
            <div className="absolute inset-0 bg-blue-500 opacity-0 hover:opacity-10 rounded-xl blur-xl"></div>

            <h2 className="text-xl font-semibold text-center relative z-10">
              {domain.name}
            </h2>
          </div>
        ))}

      </div>

      {/* Leaderboard */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">🏆 Leaderboard</h2>

        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">

          {leaders.map((user, i) => (
            <div
              key={i}
              className={`flex justify-between items-center p-3 rounded-lg mb-2 
                ${i === 0 ? "bg-yellow-500/20 border border-yellow-400" : ""}
                ${i === 1 ? "bg-gray-400/20" : ""}
                ${i === 2 ? "bg-orange-400/20" : ""}
              `}
            >
              <span className="font-medium">
                {i === 0 && "🥇"}
                {i === 1 && "🥈"}
                {i === 2 && "🥉"}
                {i > 2 && `${i + 1}.`} {user.name}
              </span>

              <span className="text-yellow-400 font-bold">
                {user.score} pts
              </span>
            </div>
          ))}

        </div>
      </div>

      {/* 🐧 Pingo Assistant */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end z-50">

        {/* Bubble */}
        <div className="mb-2 mr-2 bg-white text-black text-xs px-3 py-2 rounded-xl shadow-lg max-w-[180px] relative animate-fadeIn">
          <p>{pingoMessage}</p>
          <div className="absolute bottom-[-6px] right-4 w-3 h-3 bg-white rotate-45"></div>
        </div>

        {/* Mascot */}
        <div className="relative">

          <div className="absolute inset-0 rounded-full bg-blue-500 blur-3xl opacity-40"></div>
          <div className="absolute inset-0 rounded-full border-2 border-blue-400 opacity-60 animate-pulse"></div>

          <img
            src="/src/assets/pingo-idle.png"
            alt="Pingo"
            onClick={() => {
              const tips = [
                "💡 Try solving a quiz now!",
                "⚡ Code review gives more XP!",
                "🏆 Aim for top 3 leaderboard!",
                "📚 Modules help you learn faster!",
              ];

              const random = tips[Math.floor(Math.random() * tips.length)];
              setPingoMessage(random);
            }}
            className="relative w-16 md:w-20 animate-breathe hover:scale-105 transition cursor-pointer"
          />
        </div>

      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-slate-800 p-6 rounded-xl shadow-lg text-center w-[300px] animate-scaleIn">

            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to logout?
            </h2>

            <div className="flex justify-center gap-4">

              {/* Yes */}
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Yes
              </button>

              {/* No */}
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600"
              >
                No
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}