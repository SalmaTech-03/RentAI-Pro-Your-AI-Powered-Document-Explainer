from flask import Flask, render_template, request, jsonify, url_for
from flask_cors import CORS
import io
from pypdf import PdfReader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain.prompts import PromptTemplate
from langchain_ollama import OllamaEmbeddings, OllamaLLM

# --- APP & AI INITIALIZATION ---
app = Flask(__name__)
CORS(app)

# These are loaded once when the server starts.
llm = OllamaLLM(model="tinyllama")
embeddings = OllamaEmbeddings(model="nomic-embed-text")
vector_store = None # This will hold the document's vector data in memory.

# --- CORE AI LOGIC ---
def get_text_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    return text_splitter.split_text(text)

def get_rag_chain(retriever):
    template = """
    You are an expert assistant for explaining legal documents. Use only the context provided to answer the question. 
    If the context doesn't contain the answer, state clearly that the information is not found. Be concise and helpful.
    Context: {context}
    Question: {question}
    Answer:"""
    prompt = PromptTemplate.from_template(template)
    chain = (
        {"context": retriever, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )
    return chain

# --- API ENDPOINTS ---

# Endpoint to serve the main HTML page
@app.route('/')
def home():
    return render_template('index.html')

# Endpoint to handle file uploads and create the vector store
@app.route('/api/upload', methods=['POST'])
def handle_upload():
    global vector_store
    if 'files' not in request.files:
        return jsonify({"error": "No files provided"}), 400
    
    files = request.files.getlist('files')
    try:
        full_text = ""
        for file in files:
            pdf_reader = PdfReader(io.BytesIO(file.read()))
            for page in pdf_reader.pages:
                full_text += page.extract_text() or ""
        
        text_chunks = get_text_chunks(full_text)
        vector_store = FAISS.from_texts(texts=text_chunks, embedding=embeddings)
        
        return jsonify({"message": f"Successfully processed {len(files)} document(s)."}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to process files: {str(e)}"}), 500

# Endpoint to answer questions
@app.route('/api/ask', methods=['POST'])
def handle_ask():
    if not vector_store:
        return jsonify({"error": "Please upload and process documents first."}), 400

    data = request.get_json()
    question = data.get('question')
    if not question:
        return jsonify({"error": "No question provided."}), 400

    try:
        retriever = vector_store.as_retriever()
        rag_chain = get_rag_chain(retriever)
        answer = rag_chain.invoke(question)
        return jsonify({"answer": answer})
    except Exception as e:
        return jsonify({"error": f"Failed to generate answer: {str(e)}"}), 500
        
# --- MAIN RUN ---
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7860, debug=True)