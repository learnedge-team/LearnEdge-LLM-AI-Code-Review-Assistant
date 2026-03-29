# LearnEdge-LLM-AI-Code-Review-Assistant 🤖✨

**Developed by Shreeyash Asati (ML Engineer)**

🌟 **Live API Endpoint**: [Test the Code Reviewer Here](https://ai-code-review-assistant-n7po.onrender.com/docs#/)  
📸 **Instagram**: [@learnedge.co.in](https://www.instagram.com/learnedge.co.in)  
📧 **Contact**: [learnedge.asper@gmail.com](mailto:learnedge.asper@gmail.com)  

An intelligent, asynchronous FastAPI backend that acts as an expert programming mentor. It receives student code submissions and leverages Groq's Lightning-Fast AI (Llama 3.1) to automatically analyze, review, and fix syntax and structural bugs.

---

## 🚀 Key Features

* **Mentorship-Driven Reviews**: Doesn't just give the answer—identifies exact bugs (Syntax, Logical, Type), explains why they happen, and provides a gentle hint.
* **Strict Structured JSON Output**: Guarantees that the LLM responds with a strongly typed JSON schema containing the status, issues array, explanation, hint, and the completely fixed code string.
* **Intelligent Auto-Language Detection**: The AI mentor auto-detects whatever programming language the student typed (Python, Java, C++, JS, etc.) and strictly provides the `fixed_code` in the exact same language.
* **Resilient "Fuzzy" API Keys**: The API accepts virtually any spelling variation of typical frontend code requests (`question name`, `question_name`, `studentId`, `student_solution`, `code`, etc.) blocking generic `422 Unprocessable Content` errors.
* **Dynamic Problem Recognition**: If the submitted coding problem is already stored in the local `questions.json` database, it relies on heavily verified expected approaches. If the problem is unknown, the LLM dynamically deduces the intent from the code itself.

---

## 🛠️ Technology Stack

* **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
* **Runtime Data Validation**: [Pydantic V2](https://docs.pydantic.dev/latest/)
* **AI Provider**: [Groq API](https://groq.com/) using `llama-3.1-8b-instant`
* **Python ASGI Server**: [Uvicorn](https://www.uvicorn.org/)

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.comlearnedge-team/LearnEdge-LLM-AI-Code-Review-Assistant.git
   cd ai-code-review-assistant-
   ```

2. **Set up a Virtual Environment (Optional but Recommended)**
   ```bash
   python -m venv .venv
   .\.venv\Scripts\activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Variables**
   Create a `.env` file in the root directory and add your Groq API Key:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```

---

## 🏃‍♂️ Running the Server

Start the application gracefully via Uvicorn:
```bash
python run.py
```
*The server will boot up with automatic hot-reloading enabled by default and will be accessible at `http://127.0.0.1:8000`.*

---

## 📡 API Usage

The primary code-review endpoint is located at `POST /api/v1/review-code`. 

*(You can also securely test or mock it dynamically using the auto-generated Swagger UI at [http://localhost:8000/docs](http://127.0.0.1:8000/docs))*

### **Sample Payload Request:**
```json
{
  "question name": "Two Sum",
  "student id": "student_993",
  "student solution": "def add(a, b):\n    return a - b"
}
```

### **Sample JSON Response:**
```json
{
  "student_id": "student_993",
  "status": "needs_work",
  "issues": [
    "Logical Error: The function subtracts the arguments instead of adding them."
  ],
  "fixed_code": "def add(a, b):\n    return a + b",
  "explanation": "To solve standard 'Two Sum' logic, we are tasked with combining elements together. The code was using the '-' mathematical subtraction operator instead.",
  "hint": "Check exactly what operator you placed inside the return statement!"
}
```

---

## 📁 Project Structure

```text
├── app/
│   ├── api/
│   │   └── routes.py            # FastAPI Routing
│   ├── core/
│   │   ├── config.py            # Environment configurations
│   │   └── exceptions.py        # Error & Exception Handling
│   ├── db/
│   │   └── questions.json       # Optional Problem Statement definitions
│   ├── models/
│   │   ├── request.py           # Robust Pydantic inputs
│   │   └── response.py          # Expected JSON structure
│   ├── services/
│   │   ├── llm_service.py       # Asynchronous Graq AI client connection
│   │   ├── retrieval.py         # DB Search logic
│   │   └── review_service.py    # Main Business Logic
│   └── utils/
│       ├── logger.py            # Printouts and telemetry
│       └── prompt_builder.py    # Heavily engineered System Prompts
├── .env                         # API Keys (Ignored by Git)
├── .gitignore                   
├── requirements.txt             # Pip dependencies
├── run.py                       # Uvicorn boot script
└── README.md                    # You are here!
```
