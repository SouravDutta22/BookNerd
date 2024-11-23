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

// Display checkout items
function displayCheckoutItems() {
    const currentUser = checkLogin();
    if (!currentUser) return;

    const checkoutContainer = document.getElementById('checkoutItems');
    const cartKey = getUserCartKey(currentUser.email);
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    checkoutContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        const checkoutItem = document.createElement('div');
        checkoutItem.className = 'checkout-item';
        checkoutItem.innerHTML = `
            <img src="${item.thumbnail}" alt="${item.title}" />
            <div class="item-info">
                <h3>${item.title}</h3>
                <p>Author: ${item.author}</p>
                <p>Price: ₹${item.price.toFixed(0)}</p>
            </div>
        `;
        checkoutContainer.appendChild(checkoutItem);
    });

    document.getElementById('checkoutTotal').textContent = total.toFixed(0);
}

// Calculate delivery date (current date + 4 days)
function getDeliveryDate() {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);
    return deliveryDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });
}

// Show order success message
function showOrderSuccess() {
    const shippingForm = document.querySelector('.shipping-form');
    const deliveryDate = getDeliveryDate();
    
    shippingForm.innerHTML = `
        <div class="order-success">
            <h2>Order Placed Successfully!!!</h2>
            <p class="success-message">Thank you for shopping with BookNerd!</p>
            <p class="delivery-info">Your books will be delivered by:</p>
            <p class="delivery-date">${deliveryDate}</p>
            <div class="back-button-container">
                <button onclick="window.location.href='cart.html'" class="back-to-cart-btn">
                    Return to Cart
                </button>
            </div>
        </div>
    `;
}

// Update payment fields based on selected payment method
function updatePaymentFields() {
    const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
    const paymentFieldsContainer = document.getElementById('payment-specific-fields');
    
    let fieldsHTML = '';
    
    switch(selectedPayment) {
        case 'upi':
            fieldsHTML = `
                <div class="payment-field-group">
                    <label for="upiId">UPI ID</label>
                    <input type="text" id="upiId" name="upiId" placeholder="" required>
                </div>
            `;
            break;
            
        case 'debit':
        case 'credit':
            fieldsHTML = `
                <div class="card-details">
                    <div class="payment-field-group card-number">
                        <label for="cardNumber">Card Number</label>
                        <input type="text" id="cardNumber" name="cardNumber" 
                            class="secure-input" maxlength="16" 
                            placeholder="" required>
                    </div>
                    <div class="payment-field-group">
                        <label for="expDate">Expiry Date</label>
                        <input type="text" id="expDate" name="expDate" 
                            placeholder="" maxlength="5" required>
                    </div>
                    <div class="payment-field-group">
                        <label for="cvv">CVV</label>
                        <input type="password" id="cvv" name="cvv" 
                            maxlength="3" placeholder="" required>
                    </div>
                </div>
            `;
            break;
            
        default:
            fieldsHTML = ''; // No extra fields for COD
    }
    
    paymentFieldsContainer.innerHTML = fieldsHTML;
    
    // Add input formatting for card fields if they exist
    if (selectedPayment === 'debit' || selectedPayment === 'credit') {
        setupCardFieldFormatting();
    }
}

// Setup formatting for card input fields
function setupCardFieldFormatting() {
    // Format card number
    const cardInput = document.getElementById('cardNumber');
    cardInput?.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 16) value = value.slice(0, 16);
        e.target.value = value;
    });

    // Format expiry date
    const expInput = document.getElementById('expDate');
    expInput?.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) value = value.slice(0, 4);
        if (value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }
        e.target.value = value;
    });

    // Format CVV
    const cvvInput = document.getElementById('cvv');
    cvvInput?.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 3) value = value.slice(0, 3);
        e.target.value = value;
    });
}

// Add payment styles
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .payment-specific-fields {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #eee;
        }

        .payment-field-group {
            margin-bottom: 15px;
        }

        .payment-field-group label {
            display: block;
            margin-bottom: 5px;
            color: rgb(117, 31, 31);
            font-weight: 500;
        }

        .payment-field-group input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
        }

        .card-details {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr;
            gap: 15px;
        }

        .card-number {
            grid-column: 1 / -1;
        }

        .secure-input {
            font-family: monospace;
            letter-spacing: 0.2em;
        }

        .order-success {
            text-align: center;
            padding: 20px;
        }
        
        .order-success h2 {
            color: #2e7d32;
            margin-bottom: 20px;
        }
        
        .success-message {
            font-size: 1.2rem;
            margin-bottom: 30px;
            color: #333;
        }
        
        .delivery-info {
            font-size: 1.1rem;
            color: #666;
            margin-bottom: 10px;
        }
        
        .delivery-date {
            font-size: 1.3rem;
            color: rgb(117, 31, 31);
            font-weight: bold;
            margin-bottom: 30px;
        }
        
        .back-button-container {
            margin-top: 30px;
        }
        
        .back-to-cart-btn {
            background-color: rgb(117, 31, 31);
            color: white;
            padding: 12px 25px;
            border: none;
            border-radius: 5px;
            font-size: 1.1rem;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        
        .back-to-cart-btn:hover {
            background-color: rgb(147, 41, 41);
        }
    </style>
`);

// Update fields when payment method changes
document.querySelectorAll('input[name="payment"]').forEach(radio => {
    radio.addEventListener('change', updatePaymentFields);
});

// Handle form submission
document.getElementById('shippingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const currentUser = checkLogin();
    if (!currentUser) return;

    const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
    let paymentDetails = { method: selectedPayment };

    // Collect payment-specific details
    if (selectedPayment === 'upi') {
        paymentDetails.upiId = document.getElementById('upiId').value;
    } else if (selectedPayment === 'debit' || selectedPayment === 'credit') {
        paymentDetails.cardNumber = document.getElementById('cardNumber').value;
        paymentDetails.expiryDate = document.getElementById('expDate').value;
        paymentDetails.cvv = document.getElementById('cvv').value;
    }

    // Create order summary
    const orderSummary = {
        customerName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: {
            street: document.getElementById('address').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            pincode: document.getElementById('zipcode').value
        },
        paymentDetails: paymentDetails,
        items: JSON.parse(localStorage.getItem(getUserCartKey(currentUser.email))),
        totalAmount: document.getElementById('checkoutTotal').textContent,
        orderDate: new Date().toISOString(),
        expectedDelivery: getDeliveryDate()
    };

    // Store order and show success message
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(orderSummary);
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem(getUserCartKey(currentUser.email), '[]');
    showOrderSuccess();
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    displayCheckoutItems();
    updatePaymentFields();
});
