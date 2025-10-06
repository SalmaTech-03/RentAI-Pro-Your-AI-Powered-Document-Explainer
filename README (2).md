# 📄 RentAI Pro: Your AI-Powered Document Explainer

**Transform dense legal documents into simple, actionable insights. RentAI Pro is a full-stack web application that leverages the power of Large Language Models (LLMs) to provide instant, intelligent answers about your rental agreements.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Python Version](https://img.shields.io/badge/Python-3.10%2B-blue?logo=python)](https://www.python.org/)
[![Framework](https://img.shields.io/badge/Framework-Flask-black?logo=flask)](https://flask.palletsprojects.com/)
[![UI](https://img.shields.io/badge/UI-Custom%20HTML/CSS/JS-orange)](https://developer.mozilla.org/en-US/docs/Web/HTML)

---


### ✨ Key Features

- **Stunning, Modern UI:** A beautiful, responsive front-end built with custom HTML, CSS, and JavaScript, featuring a premium dark theme and smooth animations.
- **Intelligent Document Analysis:** Upload one or more PDF rental agreements for comprehensive analysis.
- **AI-Powered Q&A:** Ask questions in natural language and get instant, context-aware answers based on the content of your documents.
- **On-Device Power:** Utilizes a self-hosted **Ollama** instance to run powerful open-source models like `Llama 3` or `TinyLlama` locally.
- **Advanced RAG Pipeline:** Employs a sophisticated **Retrieval-Augmented Generation (RAG)** pipeline using **LangChain** and **FAISS** for accurate, source-grounded responses.
- **Full-Stack Architecture:** Built on a robust Python **Flask** back-end that serves a REST API to the front-end, creating a professional, decoupled application.
- **Containerized for Deployment:** Comes with a complete **Dockerfile** for easy, reliable deployment on any platform that supports containers.

---

### 🚀 How It Works

RentAI Pro combines a custom user interface with a powerful AI back-end to deliver a seamless experience:

1.  **Front-End (The UI):** The user interacts with a beautiful web interface built from scratch. When a PDF is uploaded, it is sent to the back-end's `/api/upload` endpoint.
2.  **Back-End (The Brain):** The Flask server receives the PDF, extracts the text, and chunks it into manageable pieces.
3.  **Vectorization:** Using the `nomic-embed-text` model via Ollama, each text chunk is converted into a numerical vector. These vectors are stored in a FAISS vector store in memory.
4.  **Question Answering:** When the user asks a question, it is sent to the `/api/ask` endpoint. The back-end converts the question into a vector, finds the most relevant text chunks from the vector store, and feeds them—along with the original question—to the `llama3` (or `tinyllama`) model.
5.  **Response:** The LLM generates a text answer based *only* on the provided context, which is then sent back to the front-end and displayed to the user.

---

### 🛠️ Tech Stack

- **Back-End:** Python, Flask, LangChain, Ollama, FAISS
- **Front-End:** HTML5, CSS3, Vanilla JavaScript
- **Deployment:** Docker, Gunicorn

---

### ⚙️ Running Locally

Follow these steps to run RentAI Pro on your local machine.

**1. Prerequisites:**
   - [Python 3.10+](https://www.python.org/downloads/)
   - [Ollama](https://ollama.com/) installed and running.
   - [Git](https://git-scm.com/) for cloning the repository.

**2. Clone the Repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/final-rental-bot.git
   cd final-rental-bot


   3. Install Dependencies:
Install the required Python packages:
code
Bash
pip install -r requirements.txt
Pull the necessary Ollama models:
code
Bash
ollama pull llama3
ollama pull nomic-embed-text
4. Set the Environment Variable (for Windows users):
The faiss-cpu library can sometimes cause conflicts on Windows. Run this command in your terminal before starting the server:
code
Powershell
$env:KMP_DUPLICATE_LIB_OK="TRUE"
5. Run the Application:
Start the Flask back-end server:
code
Bash
python backend.py
Open your web browser and navigate to:
http://127.0.0.1:5000
🚀 Deployment
This application is designed for containerized deployment using the provided Dockerfile. It is pre-configured to run on platforms like Hugging Face Spaces or any cloud service that supports Docker (e.g., Render, Railway, DigitalOcean App Platform).
Key Deployment Steps:
Push the repository to your chosen cloud service.
Ensure the platform is configured to use the Dockerfile.
The Dockerfile will handle the rest: installing dependencies, pulling Ollama models, and starting the Gunicorn production server.
📄 License
This project is licensed under the MIT License. See the LICENSE file for details.
code
Code
---

### **Step 2: Take a Great Screenshot**

1.  Run your application locally so it looks perfect.
2.  Take a screenshot of the entire application window, showing both the sidebar and a conversation in progress.
3.  Go to a free image hosting site like [Imgur](https://imgur.com/upload).
4.  Upload your screenshot.
5.  After it's uploaded, right-click the image and select **"Copy Image Address"**.
6.  **Paste this URL** into the `README.md` file where it says `https://i.imgur.com/YOUR_SCREENSHOT_URL.png`.

---