

# 🏡 RentAI Pro — AI-Powered Rental Agreement Explainer
**A production-grade RAG (Retrieval-Augmented Generation) system that analyzes rental/lease agreements using LLaMA 3, FAISS vector search, advanced embeddings, and a premium real-time chat UI.**

RentAI Pro enables users to upload rental agreements (PDFs) and instantly ask questions, extract clauses, validate terms, and understand legal details using a secure, self-hosted AI pipeline.

Built with:
- **LLaMA 3.1 (Groq / Ollama)**
- **FAISS Vector Database**
- **Nomic Embeddings**
- **LangChain**
- **Flask API**
- **Premium Frontend UI (HTML/CSS/JS)**
- **Dockerized Production Deployment**

This project demonstrates **full-stack GenAI engineering** — ideal for Data Scientist + AI Engineer roles.

---

## 🌟 Features

### ✅ AI-Powered Document Question Answering  
Ask natural language questions about lease/rental agreements:  
- “What is the notice period?”  
- “Is there a penalty for early termination?”  
- “Who is responsible for repairs?”  

### ✅ Accurate Retrieval-Augmented Generation (RAG)  
Uses:
- **Recursive text chunking**
- **Embedding generation (`nomic-embed-text`)**
- **FAISS vector indexing**
- **Context-enforced prompting (no hallucinations)**

### ✅ Dual LLM Support (Automatic Switching)
- **Groq-hosted LLaMA 3.1 (8B Instant)** — fast, cloud inference  
- **Ollama local models (TinyLLaMA)** — for offline/secure use  

### ✅ Full Production Backend  
Built in Flask with clean endpoints:
- `/api/upload` — processes PDFs → chunks → embeddings → FAISS index  
- `/api/ask` — retrieves relevant chunks + generates answers  

### ✅ Premium Frontend UI  
- Modern landing page  
- Drag & drop PDF upload  
- Real chat interface  
- Typing indicators  
- Toast notifications  
- Beautiful CSS design system  

### ✅ Dockerized for Real Deployment  
Model pulling, server startup, and Gunicorn worker configuration — all handled inside a robust `run.sh`.

---

## 🏗️ Architecture Overview

User → Web UI → Flask API → FAISS Vector DB → LLaMA 3 (Groq/Ollama) → Response │ └── Embeddings → Chunking → Indexing

**Core Components:**
- `backend.py` — API, RAG chain, LLM selection  
- `templates/index.html` — UI  
- `static/script.js` — chat logic  
- `static/style.css` — premium styling  
- `Dockerfile` — full deployment pipeline  

---

## 📁 Project Structure

RENTAL-AGREEMENT-BOT/ │ ├── backend.py                # Flask backend + RAG pipeline ├── Dockerfile                # Docker deployment + model pulling ├── requirements.txt ├── run.sh                    # Auto-generated via Dockerfile │ ├── templates/ │   └── index.html            # Frontend page │ ├── static/ │   ├── style.css             # UI design system │   └── script.js             # Chat logic + file upload + UX │ └── README.md                 # You're reading it

---

## ⚙️ How It Works (RAG Flow)

### **1. PDF Upload**
User uploads one or more PDFs.  
Text extraction is done using **PyPDF**.

### **2. Chunking**

chunk_size = 1000 chunk_overlap = 200

Handled by LangChain’s `RecursiveCharacterTextSplitter`.

### **3. Embeddings**
Using:

nomic-embed-text (Ollama)

### **4. Vector Indexing**
FAISS stores dense vectors for fast retrieval.

### **5. Query Processing**
- Retrieve top-K relevant chunks  
- Feed context + question into LLaMA 3.1  
- Use strict “use only context; no hallucination” prompt  

### **6. Response Generation**
Clean, contextual answers are returned to the chat UI.

---

## 🚀 Getting Started

### **1. Clone the repository**
```bash
git clone https://github.com/SALMA003/RENTAL-AGREEMENT-BOT.git
cd RENTAL-AGREEMENT-BOT

2. Build the Docker image

docker build -t rentai .

3. Run the container

docker run -p 7860:7860 rentai

4. Open in browser

http://localhost:7860


---

🧪 API Endpoints

POST /api/upload

Uploads and processes PDFs.

Body:
multipart/form-data

Response:

{
  "message": "Successfully processed 1 document(s)."
}


---

POST /api/ask

Ask a question related to the uploaded PDFs.

Body:

{
  "question": "What is the notice period?"
}

Response:

{
  "answer": "The notice period mentioned in the document is..."
}


---

🧠 Technologies Used

AI & RAG

LLaMA 3.1 (Groq)

TinyLLaMA (Ollama)

FAISS Vector DB

Nomic Embeddings

LangChain


Backend

Flask

Gunicorn

Python 3.10


Frontend

HTML5

CSS3 (Premium design system)

Vanilla JavaScript


Deployment

Docker

Ollama runtime

Shell automation


---

🔮 Future Enhancements

Support for multiple LLM providers (OpenAI, Claude, Gemini)

Multi-document summarization

Clause extraction & classification

Policy comparison engine

User authentication & session-based vector stores



---

👤 Author

Salma (SALMA003)
AI Engineer | Data Scientist | ML Developer
