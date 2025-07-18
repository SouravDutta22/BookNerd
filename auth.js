// Check authentication status
function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authButton = document.getElementById('authButton');
    const userDisplay = document.getElementById('userDisplay');

    if (currentUser) {
        // User is logged in
        userDisplay.textContent = `${currentUser.name}`;
        authButton.textContent = 'Logout';
        authButton.classList.add('logout-btn');
    } else {
        // User is not logged in
        userDisplay.textContent = '';
        authButton.textContent = 'Login';
        authButton.classList.remove('logout-btn');
    }
}

// Handle login/logout
function handleAuthAction() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser) {
        // Logout
        localStorage.removeItem('currentUser');
        checkAuth();
        
        // Redirect to home  page if on cart page
        if (window.location.pathname.includes('cart.html')) {
            window.location.href = 'index.html';
        }
    } else {
        // Redirect to login page
        window.location.href = 'login.html';
    }
}

// Protect cart page
function protectCartPage() {
    if (window.location.pathname.includes('cart.html')) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            window.location.href = 'login.html';
        }
    }
}

// Initialize auth system
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    protectCartPage();
});
