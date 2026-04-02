import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

export default function Dashboard({ xp, level }) {
  const navigate = useNavigate();

  const [leaders, setLeaders] = useState([]);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const [pingoMessage, setPingoMessage] = useState("");
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [showBubble, setShowBubble] = useState(false);

  const [showXpFloat, setShowXpFloat] = useState(false);

  const domains = [
    { name: "DSA", route: "/code", logo: "/dsa.png" },
    { name: "Web Dev", route: "/modules", logo: "/web.png" },
    { name: "Machine Learning", route: "/modules", logo: "/Ml.png" },
    { name: "AgriNova", route: "/modules", logo: "/AgriNova.jpeg" },
  ];

  useEffect(() => {
    const handleClickOutside = () => setShowDropdown(false);

    window.addEventListener("click", handleClickOutside);

    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    axios
      .get("https://learnedge-backend-raxx.onrender.com/api/leaderboard")
      .then((res) => setLeaders(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const socket = io("https://learnedge-backend-raxx.onrender.com");

    socket.on("leaderboardUpdate", (data) => {
      setLeaders(data);
    });

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    let message = "";

    if (xp === 0) message = "👋 Start your journey!";
    else if (xp < 50) message = "🔥 Good start! Try quiz!";
    else if (xp < 100) message = "🚀 You're improving fast!";
    else message = "🏆 You're on fire!";

    setPingoMessage(message);
    setDisplayedMessage("");
    setShowBubble(true);
  }, [xp]);

  useEffect(() => {
    if (!pingoMessage) return;

    setShowBubble(true);

    const timer = setTimeout(() => {
      setShowBubble(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [pingoMessage]);

  useEffect(() => {
    if (!pingoMessage) return;

    let i = 0;

    const interval = setInterval(() => {
      if (i < pingoMessage.length) {
        setDisplayedMessage((prev) => prev + pingoMessage.charAt(i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [pingoMessage]);

  useEffect(() => {
    if (xp > 0) {
      setShowXpFloat(true);
      setTimeout(() => setShowXpFloat(false), 1500);
    }
  }, [xp]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 relative overflow-hidden">

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="stars"></div>
        <div className="stars opacity-40"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      <div className="shooting-stars absolute inset-0 z-0 pointer-events-none">
        <span></span><span></span><span></span>
        <span></span><span></span><span></span>
      </div>

      <div
        id="cursor-glow"
        className="pointer-events-none fixed w-40 h-40 rounded-full blur-3xl opacity-20 bg-blue-400 z-0"
      ></div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900 z-0"></div>

      <div className="relative z-10">

        {showXpFloat && (
          <div className="fixed top-20 right-10 text-yellow-400 font-bold text-xl animate-floatUp z-50">
            +XP 🎉
          </div>
        )}

        <div className="mb-6">

          <div className="flex items-center justify-between flex-wrap gap-4">

            <div className="flex items-center gap-3">
              <img src="/companyLogo.png" className="w-12 h-12 drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
              <h1 className="text-3xl font-bold transition hover:scale-105 hover:drop-shadow-[0_0_20px_rgba(96,165,250,0.8)]">
                LearnEdge Dashboard
              </h1>
            </div>

            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDropdown(!showDropdown);
                }}
                className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700
                transition-all duration-300
                hover:border-blue-400
                hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]"
              >
                👤 Profile
              </button>

              {showDropdown && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 mt-2 w-40 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-[100]"
                >
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 rounded-lg
                    hover:bg-red-500 hover:text-white transition"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>

          </div>

          <div className="mt-4 flex justify-end">
            <div className="bg-slate-800/70 backdrop-blur-lg px-4 py-3 rounded-xl border border-slate-700 
            shadow-[0_0_25px_rgba(234,179,8,0.3)] w-full max-w-xs">

              <p className="text-xs text-gray-400">Level {level}</p>

              <p className="text-lg font-bold text-yellow-400">
                ⭐ {xp} XP
              </p>

              <div className="w-full bg-gray-700 h-2 rounded mt-2">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded 
                  shadow-[0_0_10px_rgba(234,179,8,0.7)]"
                  style={{ width: `${xp % 100}%` }}
                ></div>
              </div>

            </div>
          </div>

        </div>

        <h2 className="text-lg text-gray-400 mb-6">
          Welcome back! Keep leveling up!
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {domains.map((domain, i) => (
            <div
              key={i}
              onClick={() =>
                navigate(domain.route, {
                  state: { domain: domain.name },
                })
              }
              className="relative bg-slate-800/70 backdrop-blur-lg p-6 rounded-xl cursor-pointer 
              border border-slate-700
              transition-all duration-300
              hover:border-blue-400 
              hover:shadow-[0_0_35px_rgba(59,130,246,0.7)]
              hover:-translate-y-2 hover:scale-[1.05]"
            >
              <div className="flex flex-col items-center gap-3">
                <img
                  src={domain.logo}
                  className="w-12 h-12 object-contain transition duration-300 hover:scale-110"
                />
                <h2 className="text-lg font-semibold text-center">
                  {domain.name}
                </h2>
              </div>
            </div>
          ))}

        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">🏆 Leaderboard</h2>

          <div className="bg-slate-800/70 backdrop-blur-lg p-4 rounded-xl border border-slate-700">

            {leaders.map((user, i) => (
              <div
                key={i}
                className={`flex justify-between p-3 rounded mb-2 transition
                ${i === 0
                    ? "bg-yellow-500/20 border border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.6)]"
                    : "hover:bg-slate-700"}
              `}
              >
                <span>{user.name}</span>
                <span className="text-yellow-400">
                  {user.score} pts
                </span>
              </div>
            ))}

          </div>
        </div>

        <div className="fixed bottom-6 right-6 flex flex-col items-end z-50">

          <div className="mb-2 mr-2 max-w-[180px]">
            <div
              className={`bg-white text-black text-xs px-3 py-2 rounded-xl shadow-lg 
              transition-all duration-500 
              ${showBubble ? "opacity-100" : "opacity-0"}`}
            >
              <p>{displayedMessage}</p>
            </div>
          </div>

          <div className="relative">

            <div className="absolute inset-0 rounded-full bg-cyan-400 blur-3xl opacity-40 animate-pulse"></div>
            <div className="absolute inset-0 rounded-full border border-cyan-300 opacity-60"></div>

            <img
              src="/pingo-idle.png"
              alt="Pingo"
              className="relative w-20 md:w-24 animate-breathe cursor-pointer z-10 
              transition hover:scale-110"
              onMouseEnter={() => {
                setDisplayedMessage("😏 Ohh do you want a planner? Click me!");
                setShowBubble(true);
              }}
              onMouseLeave={() => {
                setShowBubble(false);
              }}
              onClick={() => {
                navigate("/prep-planner");
              }}
            />
          </div>

        </div>

      </div>
    </div>
  );
}