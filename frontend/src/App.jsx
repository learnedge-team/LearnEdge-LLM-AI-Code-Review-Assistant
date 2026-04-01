import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CodeReview from "./pages/CodeReview";
import Modules from "./pages/Modules";
import Topics from "./pages/Topics";
import Quiz from "./pages/Quiz";
import Login from "./pages/Login";
import PrepPlanner from "./pages/PrepPlanner";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";


import { useState, useEffect } from "react";

function App() {
  const [streak, setStreak] = useState(() => {
    return Number(localStorage.getItem("streak")) || 0;
  });

  const [xp, setXp] = useState(() => {
    return Number(localStorage.getItem("xp")) || 0;
  });

  const [level, setLevel] = useState(() => {
    return Number(localStorage.getItem("level")) || 1;
  });

  const calculateLevel = (xp) => {
    return Math.floor(xp / 100) + 1;
  };

  useEffect(() => {
    localStorage.setItem("xp", xp);
    localStorage.setItem("level", level);
  }, [xp, level]);

  useEffect(() => {
    localStorage.setItem("streak", streak);
  }, [streak]);

  return (
    <BrowserRouter>
      <Routes>

        {/* 🔐 PUBLIC ROUTE */}
        //Landing page
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/prep-planner" element={<PrepPlanner />} />

        {/* 🔐 PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard xp={xp} level={level} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/code"
          element={
            <ProtectedRoute>
              <CodeReview
                xp={xp}
                level={level}
                setXp={setXp}
                setLevel={setLevel}
                calculateLevel={calculateLevel}
                setStreak={setStreak}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/modules"
          element={
            <ProtectedRoute>
              <Modules />
            </ProtectedRoute>
          }
        />

        <Route
          path="/topics"
          element={
            <ProtectedRoute>
              <Topics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <Quiz setXp={setXp} />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;