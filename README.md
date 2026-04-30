# 🚀 AI SaaS Finance Agent

An AI-powered backend system that helps entrepreneurs evaluate the financial viability of a SaaS idea.

Built as part of a PFE (Final Year Project), this system combines:

- 📊 Financial modeling (MRR, Profit, Runway, etc.)
- 📈 Scenario simulation (pessimistic / realistic / optimistic)
- 📚 RAG (Retrieval-Augmented Generation) using PDF knowledge
- 🤖 Local LLM (Qwen via Ollama)
- ⚡ FastAPI backend

---

## 🧠 Architecture Overview

User → FastAPI → Finance Chat Agent  
→ Guard (scope check)  
→ Discovery (collect inputs)  
→ Finance Agent  
→ Calculator + Scenario Engine + RAG + Qwen  
→ Response

---

## ⚙️ Features

### ✅ Finance Analysis
- MRR / ARR
- Profit / Burn rate
- Runway
- Break-even point
- CAC / LTV

### 📈 Scenario Simulation
- 3 projections:
  - Pessimistic
  - Realistic
  - Optimistic

### 📚 RAG (PDF Knowledge)
- Extracts financial concepts from PDFs
- Uses embeddings + ChromaDB
- Enhances explanations with real knowledge

### 🤖 AI Advisor
- Qwen (local LLM via Ollama)
- Interprets financial metrics
- Provides insights and suggestions

### 🚧 Scope Control
- Finance-only agent
- Rejects out-of-scope questions

---

## 🗂️ Project Structure

backend/
├── app/
│ ├── agents/
│ │ ├── finance_agent.py
│ │ ├── finance_chat_agent.py
│ │ └── finance_guard.py
│ │
│ ├── tools/
│ │ ├── saas_calculator.py
│ │ └── scenario_analysis.py
│ │
│ ├── rag/
│ │ ├── ingest.py
│ │ ├── retriever.py
│ │ └── vector_store/
│ │
│ ├── llm/
│ │ └── ollama_client.py
│ │
│ └── main.py
│
├── documents/
│ └── *.pdf
│
└── README.md


---

1. Create virtual environment :
python -m venv venv
venv\Scripts\activate

---

3. Install dependencies : 
pip install fastapi uvicorn requests pydantic
pip install chromadb sentence-transformers pypdf

---

🤖 Setup Ollama (Local LLM)

Download Ollama:

👉 https://ollama.com

Then run:

ollama pull qwen3:1.7b
ollama run qwen3:1.7b

---

📚 RAG Setup (PDF ingestion)

Put your PDFs in : backend/documents/

Then run : python app/rag/ingest.py

---


🚀 Run the backend 
uvicorn app.main:app --reload

Open:

http://127.0.0.1:8000/docs
