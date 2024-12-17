// Auth functionality
class Auth {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });

        // Form submissions
        document.getElementById('login-form').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('signup-form').addEventListener('submit', (e) => this.handleSignup(e));
        document.getElementById('logout-btn').addEventListener('click', () => this.handleLogout());
    }

    switchTab(tab) {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
        
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
        document.getElementById(`${tab}-form`).classList.add('active');
    }

    handleLogin(e) {
        e.preventDefault();
        const form = e.target;
        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelector('input[type="password"]').value;

        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.setCurrentUser(user);
            this.showChat();
        } else {
            this.showError('Invalid credentials');
        }
    }

    handleSignup(e) {
        e.preventDefault();
        const form = e.target;
        const username = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelector('input[type="password"]').value;

        if (this.users.some(u => u.email === email)) {
            this.showError('Email already exists');
            return;
        }

        const newUser = { id: Date.now(), username, email, password };
        this.users.push(newUser);
        localStorage.setItem('users', JSON.stringify(this.users));
        
        this.setCurrentUser(newUser);
        this.showChat();
    }

    handleLogout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.showAuth();
    }

    setCurrentUser(user) {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        document.getElementById('current-user').textContent = user.username;
    }

    showAuth() {
        document.getElementById('auth-container').classList.add('active');
        document.getElementById('chat-container').classList.remove('active');
    }

    showChat() {
        document.getElementById('auth-container').classList.remove('active');
        document.getElementById('chat-container').classList.add('active');
    }

    showError(message) {
        // Create and show error message with animation
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        document.querySelector('.auth-box').appendChild(error);
        
        setTimeout(() => error.remove(), 3000);
    }
}