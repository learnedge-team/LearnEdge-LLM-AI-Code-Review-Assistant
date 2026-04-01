import { useLocation, useNavigate } from "react-router-dom";

export default function Modules() {
  const navigate = useNavigate();
  const location = useLocation();

  const domain = location.state?.domain || "DSA";

  const modulesData = {
    DSA: {
      pdf: "/pdfs/dsa.pdf",
      quiz: [
        {
          q: "What is time complexity of binary search?",
          options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
          answer: "O(log n)",
        },
        {
          q: "Which data structure uses FIFO?",
          options: ["Stack", "Queue", "Tree", "Graph"],
          answer: "Queue",
        },
        {
          q: "Which is not linear DS?",
          options: ["Array", "Linked List", "Tree", "Stack"],
          answer: "Tree",
        },
        {
          q: "Best case of quicksort?",
          options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
          answer: "O(n log n)",
        },
        {
          q: "Stack works on?",
          options: ["FIFO", "LIFO", "Random", "Priority"],
          answer: "LIFO",
        },
      ],
    },

    "Web Dev": {
      pdf: "/pdfs/web.pdf",
      quiz: [
        {
          q: "HTML stands for?",
          options: [
            "Hyper Trainer Marking Language",
            "Hyper Text Markup Language",
            "Hyper Text Marketing Language",
            "Hyper Text Machine Language",
          ],
          answer: "Hyper Text Markup Language",
        },
        {
          q: "CSS is used for?",
          options: ["Structure", "Styling", "Logic", "Database"],
          answer: "Styling",
        },
        {
          q: "React is?",
          options: ["Framework", "Library", "Language", "Database"],
          answer: "Library",
        },
        {
          q: "JS runs in?",
          options: ["Browser", "Server", "Both", "None"],
          answer: "Both",
        },
        {
          q: "DOM stands for?",
          options: [
            "Document Object Model",
            "Data Object Model",
            "Digital Object Model",
            "Desktop Object Model",
          ],
          answer: "Document Object Model",
        },
      ],
    },

    "Machine Learning": {
      pdf: "/pdfs/ml.pdf",
      quiz: [
        {
          q: "ML stands for?",
          options: [
            "Machine Learning",
            "Model Learning",
            "Manual Learning",
            "Meta Learning",
          ],
          answer: "Machine Learning",
        },
        {
          q: "Supervised learning uses?",
          options: ["Labels", "No labels", "Random", "None"],
          answer: "Labels",
        },
        {
          q: "Regression predicts?",
          options: ["Category", "Number", "Image", "Text"],
          answer: "Number",
        },
        {
          q: "Overfitting means?",
          options: [
            "Too simple model",
            "Too complex model",
            "Balanced model",
            "No model",
          ],
          answer: "Too complex model",
        },
        {
          q: "Python lib for ML?",
          options: ["NumPy", "Pandas", "Scikit-learn", "All"],
          answer: "All",
        },
      ],
    },

    AgriNova: {
      pdf: "/pdfs/agrinova.pdf",
      quiz: [
        {
          q: "Smart irrigation uses?",
          options: ["AI", "Water", "Soil", "Manual"],
          answer: "AI",
        },
        {
          q: "AgriTech improves?",
          options: ["Yield", "Waste", "Loss", "None"],
          answer: "Yield",
        },
        {
          q: "Sensors monitor?",
          options: ["Soil", "Air", "Water", "All"],
          answer: "All",
        },
        {
          q: "Precision farming uses?",
          options: ["Data", "Guess", "Manual", "None"],
          answer: "Data",
        },
        {
          q: "AI in farming helps?",
          options: ["Prediction", "Damage", "Loss", "None"],
          answer: "Prediction",
        },
      ],
    },
  };

  const module = modulesData[domain];

  return (
  <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-6">

    {/* MAIN WRAPPER */}
    <div className="w-full max-w-5xl">

      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-10 text-center
               flex items-center justify-center gap-3
               transition-all duration-300
               hover:scale-105
               hover:drop-shadow-[0_0_25px_rgba(96,165,250,0.9)]">

  {domain} Module

  <img
    src="/pingo-thinking.png"
    alt="pingo thinking"
    className="w-20 h-20 transition-all duration-300 
               hover:scale-110 
               drop-shadow-[0_0_15px_rgba(59,130,246,0.7)]"
  />
</h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* PDF CARD */}
        <div className="bg-slate-800/70 backdrop-blur-xl p-6 rounded-2xl 
                        border border-slate-700 
                        transition-all duration-300
                        hover:scale-[1.03]
                        hover:border-blue-400
                        hover:shadow-[0_0_35px_rgba(59,130,246,0.5)]">

          <h2 className="text-xl font-semibold mb-3 text-blue-400">
            📄 Notes
          </h2>

          <p className="text-gray-400 mb-4">
            Learn concepts quickly before attempting quiz.
          </p>

          <a
            href={module.pdf}
            target="_blank"
            className="inline-block px-5 py-2 rounded-lg
                       bg-blue-500 transition-all duration-300
                       border border-transparent
                       hover:border-green-400
                       hover:shadow-[0_0_25px_rgba(34,197,94,0.8)]
                       hover:scale-105"
          >
            View PDF
          </a>
        </div>

        {/* QUIZ CARD */}
        <div className="bg-slate-800/70 backdrop-blur-xl p-6 rounded-2xl 
                        border border-slate-700 
                        transition-all duration-300
                        hover:scale-[1.03]
                        hover:border-green-400
                        hover:shadow-[0_0_35px_rgba(34,197,94,0.5)]">

          <h2 className="text-xl font-semibold mb-3 text-green-400">
            📝 Quick Quiz
          </h2>

          <p className="text-gray-400 mb-4">
            Test your understanding with 5 MCQs.
          </p>

          <button
            onClick={() =>
              navigate("/quiz", {
                state: { quiz: module.quiz },
              })
            }
            className="px-5 py-2 rounded-lg
                       bg-green-500 transition-all duration-300
                       border border-transparent
                       hover:border-green-300
                       hover:shadow-[0_0_30px_rgba(34,197,94,0.9)]
                       hover:scale-105
                       active:scale-95"
          >
            Start Quiz
          </button>
        </div>

      </div>
    </div>
  </div>
);
}