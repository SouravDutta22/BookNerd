 // Toggle password visibility
 function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);
    if (input.type === 'text') {
        input.type = 'password';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'text';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Toggle between login and signup forms
function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const formTitle = document.getElementById('formTitle');

    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        formTitle.textContent = 'Login to access your cart';
    } else {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        formTitle.textContent = 'Create your BookNerd account';
    }
}

// Handle signup
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const errorElement = document.getElementById('signupError');
    const successElement = document.getElementById('signupSuccess');

    // Get existing users or initialize empty array
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if user already exists
    if (users.some(user => user.email === email)) {
        errorElement.style.display = 'block';
        successElement.style.display = 'none';
        errorElement.textContent = 'Email already registered';
        return;
    }

    // Add new user
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    // Show success message
    successElement.style.display = 'block';
    errorElement.style.display = 'none';
    successElement.textContent = 'Account created successfully! Please login.';

    // Clear form
    document.getElementById('signupForm').reset();

    // Switch to login form after 2 seconds
    setTimeout(() => {
        toggleForms();
        successElement.style.display = 'none';
    }, 2000);
});

// Handle login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const errorElement = document.getElementById('loginError');

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Find user
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Store logged in user info
        localStorage.setItem('currentUser', JSON.stringify({
            name: user.name,
            email: user.email
        }));
        
        // Redirect to cart page
        window.location.href = 'cart.html';
    } else {
        errorElement.style.display = 'block';
        errorElement.textContent = 'Invalid email or password';
    }
});
// Add this to your existing login.html script section

// Redirect if already logged in
document.addEventListener('DOMContentLoaded', () => {
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (currentUser) {
window.location.href = 'index.html';
}
});

// Modified login handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
e.preventDefault();

const email = document.getElementById('loginEmail').value;
const password = document.getElementById('loginPassword').value;
const errorElement = document.getElementById('loginError');

// Get users from localStorage
const users = JSON.parse(localStorage.getItem('users') || '[]');

// Find user
const user = users.find(u => u.email === email && u.password === password);

if (user) {
// Store logged in user info
localStorage.setItem('currentUser', JSON.stringify({
    name: user.name,
    email: user.email
}));

// Redirect based on previous page or default to home
const redirectUrl = new URLSearchParams(window.location.search).get('redirect') || 'index.html';
window.location.href = redirectUrl;
} else {
errorElement.style.display = 'block';
errorElement.textContent = 'Invalid email or password';
}
});

// Modified signup handler
document.getElementById('signupForm').addEventListener('submit', function(e) {
e.preventDefault();

const name = document.getElementById('signupName').value;
const email = document.getElementById('signupEmail').value;
const password = document.getElementById('signupPassword').value;
const errorElement = document.getElementById('signupError');
const successElement = document.getElementById('signupSuccess');

// Get existing users or initialize empty array
const users = JSON.parse(localStorage.getItem('users') || '[]');

// Check if user already exists
if (users.some(user => user.email === email)) {
errorElement.style.display = 'block';
successElement.style.display = 'none';
errorElement.textContent = 'Email already registered';
return;
}

// Add new user
users.push({ name, email, password });
localStorage.setItem('users', JSON.stringify(users));

// Show success message
successElement.style.display = 'block';
errorElement.style.display = 'none';
successElement.textContent = 'Account created successfully! Please login.';

// Clear form
document.getElementById('signupForm').reset();

// Switch to login form after 2 seconds
setTimeout(() => {
toggleForms();
successElement.style.display = 'none';
}, 2000);
});