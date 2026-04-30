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
