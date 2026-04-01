import { useState, useEffect } from "react";
import axios from "axios";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/dashboard";
    }
  }, []);

  const handleSubmit = async () => {
    try {
      if (isSignup) {
        await axios.post("http://localhost:5000/api/auth/register", {
          name,
          email,
          password,
        });

        alert("Account created. Now log in.");
        setIsSignup(false);
        setPassword("");
        return;
      }

      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/dashboard";
    } catch (err) {
  console.log(err); // 👈 ADD THIS
  alert(err.response?.data?.msg || err.message);
}
  };

  return (
  <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-4 relative overflow-hidden">

    {/* ⭐ STARS */}
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="stars"></div>
      <div className="stars opacity-40"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
    </div>

    {/* 🌠 SHOOTING STARS */}
    <div className="shooting-stars absolute inset-0 z-0 pointer-events-none">
      <span></span><span></span><span></span>
      <span></span><span></span><span></span>
    </div>

    {/* ✨ CURSOR GLOW */}
    <div
      id="cursor-glow"
      className="pointer-events-none fixed w-40 h-40 rounded-full blur-3xl opacity-20 bg-blue-400 z-0"
    ></div>

    {/* 🌈 GRADIENT */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900 z-0"></div>

    {/* LOGIN CARD */}
    <div className="relative z-10 w-full max-w-md">

      <div className="bg-slate-800/70 backdrop-blur-xl p-8 rounded-2xl 
                      border border-slate-700
                      shadow-[0_0_40px_rgba(59,130,246,0.2)]">

        {/* 🐧 MASCOT */}
        <div className="flex justify-center mb-4">
          <img
            src="/pingo-thinking.png"
            className="w-16 animate-breathe 
                       drop-shadow-[0_0_20px_rgba(59,130,246,0.7)]"
          />
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-bold mb-6 text-center
                       transition-all duration-300
                       hover:scale-105
                       hover:drop-shadow-[0_0_20px_rgba(96,165,250,0.8)]">
          {isSignup ? "Create Account" : "Login"}
        </h2>

        {/* FORM */}
        <div className="space-y-4">

          {isSignup && (
            <input
              className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700
                         focus:border-blue-400 focus:ring-2 focus:ring-blue-400
                         outline-none transition"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700
                       focus:border-blue-400 focus:ring-2 focus:ring-blue-400
                       outline-none transition"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700
                       focus:border-blue-400 focus:ring-2 focus:ring-blue-400
                       outline-none transition"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* BUTTON */}
          <button
            className="group relative w-full py-3 rounded-lg bg-blue-600 
                       transition-all duration-300
                       hover:scale-105"
            onClick={handleSubmit}
          >
            <span className="absolute inset-0 rounded-lg bg-green-400 opacity-0 
                             group-hover:opacity-20 blur-xl transition"></span>

            <span className="relative z-10">
              {isSignup ? "Sign Up" : "Login"}
            </span>
          </button>

        </div>

        {/* SWITCH */}
        <p className="mt-6 text-sm text-center text-gray-400">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            className="text-blue-400 font-medium transition hover:underline hover:drop-shadow-[0_0_10px_rgba(96,165,250,0.7)]"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Sign up"}
          </button>
        </p>

      </div>
    </div>
  </div>
  );}