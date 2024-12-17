// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const auth = new Auth();
    const chat = new Chat();

    // Check if user is already logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        auth.setCurrentUser(currentUser);
        auth.showChat();
    } else {
        auth.showAuth();
    }
});