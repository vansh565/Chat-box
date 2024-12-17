// Chat functionality
class Chat {
    constructor() {
        this.messages = JSON.parse(localStorage.getItem('messages')) || [];
        this.setupEventListeners();
        this.loadMessages();
    }

    setupEventListeners() {
        document.getElementById('message-form').addEventListener('submit', (e) => this.handleSendMessage(e));
        this.setupAutoScroll();
    }

    handleSendMessage(e) {
        e.preventDefault();
        const input = e.target.querySelector('input');
        const message = input.value.trim();
        
        if (message) {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            const newMessage = {
                id: Date.now(),
                text: message,
                userId: currentUser.id,
                username: currentUser.username,
                timestamp: new Date().toISOString()
            };

            this.messages.push(newMessage);
            localStorage.setItem('messages', JSON.stringify(this.messages));
            this.addMessageToUI(newMessage);
            input.value = '';
        }
    }

    loadMessages() {
        const messagesContainer = document.getElementById('messages');
        messagesContainer.innerHTML = '';
        this.messages.forEach(message => this.addMessageToUI(message));
    }

    addMessageToUI(message) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const messagesContainer = document.getElementById('messages');
        
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.userId === currentUser.id ? 'sent' : 'received'}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const username = document.createElement('div');
        username.className = 'message-username';
        username.textContent = message.username;
        
        const text = document.createElement('div');
        text.className = 'message-text';
        text.textContent = message.text;
        
        const time = document.createElement('div');
        time.className = 'message-time';
        time.textContent = this.formatTime(message.timestamp);
        
        messageContent.appendChild(username);
        messageContent.appendChild(text);
        messageContent.appendChild(time);
        messageElement.appendChild(messageContent);
        
        messagesContainer.appendChild(messageElement);
        this.scrollToBottom();
    }

    setupAutoScroll() {
        const messagesContainer = document.getElementById('messages');
        messagesContainer.addEventListener('scroll', () => {
            const { scrollTop, scrollHeight, clientHeight } = messagesContainer;
            if (scrollHeight - scrollTop === clientHeight) {
                this.isScrolledToBottom = true;
            } else {
                this.isScrolledToBottom = false;
            }
        });
    }

    scrollToBottom() {
        if (this.isScrolledToBottom) {
            const messagesContainer = document.getElementById('messages');
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
}