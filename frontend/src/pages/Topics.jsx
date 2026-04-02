import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Topics() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { domain, level } = state || {};

  const [selectedTopic, setSelectedTopic] = useState(null);

  const topics = [
    "Introduction",
    "Core Concepts",
    "Practice Examples",
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">

      <h1 className="text-2xl mb-6">
        📖 {domain} - {level}
      </h1>

      <div className="mb-6">
        {topics.map((topic, i) => (
          <div
            key={i}
            onClick={() => setSelectedTopic(topic)}
            className="bg-slate-800 p-4 mb-3 rounded cursor-pointer hover:bg-slate-700"
          >
            {topic}
          </div>
        ))}
      </div>

      {selectedTopic && (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">

          <h2 className="text-xl mb-3">
            📘 {selectedTopic}
          </h2>

          <p className="text-gray-300 mb-4">
            This is where your learning content will go. You can explain concepts,
            add examples, and guide the student.
          </p>

          <button
            onClick={() => navigate("/quiz")}
            className="bg-purple-500 px-4 py-2 rounded hover:bg-purple-600"
          >
            Attempt Quiz
          </button>

        </div>
      )}

    </div>
  );
}