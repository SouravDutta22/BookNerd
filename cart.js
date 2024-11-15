// Check if user is logged in
function checkLogin() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return null;
    }
    document.getElementById('userDisplay').textContent = `${currentUser.name}`;
    return currentUser;
}

// Get cart key for current user
function getUserCartKey(userEmail) {
    return `cart_${userEmail}`;
}

// Function to display cart items
function displayCartItems() {
    const currentUser = checkLogin();
    if (!currentUser) return;

    const cartContainer = document.getElementById('cartItems');
    const cartKey = getUserCartKey(currentUser.email);
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h2 id="p1">Your cart is empty</h2>
                <p id="p2">Go to <a href="shop.html">shop</a> to add some more books!</p>
            </div>
        `;
        document.getElementById('totalAmount').textContent = '0.00';
        return;
    }

    cartContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.thumbnail}" alt="${item.title}" />
            <div class="item-details">
                <h3>${item.title}</h3>
                <p>Author: ${item.author}</p>
                <p>Price: ₹${item.price.toFixed(2)}</p>
            </div>
            <div class="item-actions">
                <button class="remove-btn" onclick="removeFromCart(${index}, ${item.price})">Remove</button>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });

    document.getElementById('totalAmount').textContent = total.toFixed(2);
}

// Function to remove item from cart
function removeFromCart(index, itemPrice) {
    const currentUser = checkLogin();
    if (!currentUser) return;

    const cartKey = getUserCartKey(currentUser.email);
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    
    cart.splice(index, 1);
    localStorage.setItem(cartKey, JSON.stringify(cart));
    
    displayCartItems();
}

// Function to handle checkout
// In your cart.js file, replace the checkout function with:
function checkout() {
    const currentUser = checkLogin();
    if (!currentUser) return;

    // Instead of clearing the cart, redirect to checkout page
    window.location.href = 'checkout.html';
}
// Load cart items when page loads
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = checkLogin();
    if (currentUser) {
        displayCartItems();
    }
});