// --- FINAL, ROBUST SCRIPT FOR RentAI Pro ---

class RentAIApp {
    constructor() {
        this.isProcessing = false;
        this.documents = [];
        this.messages = [];
        // Wait for the DOM to be fully loaded before initializing
        document.addEventListener('DOMContentLoaded', () => this.init());
    }

    init() {
        console.log("Initializing RentAI Pro...");
        this.bindElements();
        if (!this.dom.appContainer) {
            console.error("Critical Error: appContainer not found. Aborting initialization.");
            return;
        }
        this.bindEvents();
        this.showHero();
        console.log("RentAI Pro Initialized Successfully.");
    }

    bindElements() {
        this.dom = {
            heroScreen: document.getElementById('heroScreen'),
            appContainer: document.getElementById('appContainer'),
            getStartedBtn: document.getElementById('getStartedBtn'),
            uploadZone: document.getElementById('uploadZone'),
            fileInput: document.getElementById('fileInput'),
            welcomeState: document.getElementById('welcomeState'),
            chatInterface: document.getElementById('chatInterface'),
            messagesContainer: document.getElementById('messagesContainer'),
            chatInput: document.getElementById('chatInput'),
            sendButton: document.getElementById('sendButton'),
            actionsContainer: document.getElementById('actionsContainer'),
            summarizeBtn: document.getElementById('summarizeBtn'),
            toastContainer: document.getElementById('toastContainer'),
        };
    }

    bindEvents() {
        this.dom.getStartedBtn?.addEventListener('click', () => this.transitionToApp());
        
        this.dom.uploadZone?.addEventListener('click', () => this.dom.fileInput.click());
        this.dom.fileInput?.addEventListener('change', (e) => this.handleFileSelect(e.target.files));
        
        document.body.addEventListener('dragover', (e) => e.preventDefault());
        document.body.addEventListener('drop', (e) => e.preventDefault());
        
        if (this.dom.uploadZone) {
            this.dom.uploadZone.addEventListener('dragover', (e) => { e.preventDefault(); this.dom.uploadZone.classList.add('dragover'); });
            this.dom.uploadZone.addEventListener('dragleave', () => this.dom.uploadZone.classList.remove('dragover'));
            this.dom.uploadZone.addEventListener('drop', (e) => {
                e.preventDefault();
                this.dom.uploadZone.classList.remove('dragover');
                this.handleFileSelect(e.dataTransfer.files);
            });
        }

        this.dom.sendButton?.addEventListener('click', () => this.sendMessage());
        this.dom.chatInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
    }

    // --- UI TRANSITIONS & STATE ---
    showHero() {
        if (this.dom.heroScreen) this.dom.heroScreen.classList.remove('hidden');
        if (this.dom.appContainer) this.dom.appContainer.classList.add('hidden');
    }
    
    async transitionToApp() {
        if (this.dom.heroScreen) {
             this.dom.heroScreen.style.opacity = 0;
             await this.sleep(600);
             this.dom.heroScreen.classList.add('hidden');
        }
        if (this.dom.appContainer) {
            this.dom.appContainer.classList.remove('hidden');
            this.dom.appContainer.style.opacity = 1;
        }
    }
    
    showChatState() {
        if(this.dom.welcomeState) this.dom.welcomeState.classList.add('hidden');
        if(this.dom.chatInterface) this.dom.chatInterface.classList.remove('hidden');
        if(this.dom.actionsContainer) this.dom.actionsContainer.classList.remove('hidden');
        if(this.dom.summarizeBtn) this.dom.summarizeBtn.disabled = false;
        if(this.dom.chatInput) this.dom.chatInput.disabled = false;
        if(this.dom.sendButton) this.dom.sendButton.disabled = false;
    }

    // --- API & FILE HANDLING ---
    handleFileSelect(files) {
        if (this.isProcessing) return;
        const pdfFiles = Array.from(files).filter(f => f.type === 'application/pdf');
        if (pdfFiles.length > 0) this.processFiles(pdfFiles);
        else this.showToast('Please select PDF files only.', 'error');
    }

    async processFiles(files) {
        this.isProcessing = true;
        this.showToast('Processing document...', 'info');
        
        const formData = new FormData();
        files.forEach(file => formData.append('files', file));

        try {
            const response = await fetch('/api/upload', { method: 'POST', body: formData });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || "Server error");
            
            this.documents = files.map(f => ({ name: f.name }));
            this.showChatState();
            this.addMessage('assistant', 'Your documents are processed! Ask me anything.');
            this.showToast(result.message, 'success');

        } catch (error) {
            this.showToast(`Error: ${error.message}`, 'error');
        } finally {
            this.isProcessing = false;
        }
    }
    
    async sendMessage() {
        const question = this.dom.chatInput?.value.trim();
        if (!question || this.isProcessing) return;

        this.addMessage('user', question);
        this.dom.chatInput.value = '';
        this.isProcessing = true;
        this.showTypingIndicator();

        try {
            const response = await fetch('/api/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question }),
            });
            const result = await response.json();
            
            this.hideTypingIndicator();
            if (!response.ok) throw new Error(result.error || "Server error");

            this.addMessage('assistant', result.answer);

        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage('assistant', `Error: ${error.message}`);
        } finally {
            this.isProcessing = false;
        }
    }

    // --- UI RENDERING HELPERS ---
    addMessage(role, content) {
        if (!this.dom.messagesContainer) return;
        const messageEl = document.createElement('div');
        messageEl.className = `message-premium ${role}`;
        messageEl.innerHTML = `
            <div class="message-avatar-premium">${role === 'user' ? '👤' : '🤖'}</div>
            <div class="message-content-premium">
                <div class="message-bubble-premium">${content.replace(/\n/g, '<br>')}</div>
            </div>`;
        this.dom.messagesContainer.appendChild(messageEl);
        this.scrollToBottom();
    }
    
    showTypingIndicator() {
        if (!this.dom.messagesContainer) return;
        const indicator = document.createElement('div');
        indicator.id = 'typing-indicator';
        indicator.className = 'message-premium assistant';
        indicator.innerHTML = `
             <div class="message-avatar-premium">🤖</div>
             <div class="message-content-premium">
                 <div class="message-bubble-premium">Thinking...</div>
             </div>`;
        this.dom.messagesContainer.appendChild(indicator);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }
    
    scrollToBottom() {
        if(this.dom.messagesContainer) this.dom.messagesContainer.scrollTop = this.dom.messagesContainer.scrollHeight;
    }

    showToast(message, type = 'info') {
        if (this.dom.toastContainer) {
            const toast = document.createElement('div');
            toast.className = `toast-premium toast--${type}`;
            toast.textContent = message;
            this.dom.toastContainer.appendChild(toast);
            setTimeout(() => toast.remove(), 4000);
        } else {
            alert(`${type}: ${message}`);
        }
    }
    
    sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
}

// Initialize the app
new RentAIApp();