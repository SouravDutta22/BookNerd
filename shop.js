const apiKey = "AIzaSyChOIwYx4pz-r5ns0b_kgHJueWR8u7kcJE";
        let startIndex = 0;
        const maxResults = 21;  // Maximum number of books per search
        function addToCart(bookData) {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Get user-specific cart key
    const cartKey = `cart_${currentUser.email}`;
    
    // Get existing cart or initialize empty array
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    
    // Add the book to cart
    cart.push(bookData);
    localStorage.setItem(cartKey, JSON.stringify(cart));
    
    // Get the button that was clicked
    const button = event.target;
    
    // Update button appearance
    button.textContent = 'Added';
    button.classList.remove('add-btn');
    button.classList.add('added-btn');
    button.disabled = true;

    // Optional: Add a check to disable buttons for items already in cart when page loads
    document.addEventListener('DOMContentLoaded', checkCartItems);
}

// Function to check and update buttons for items already in cart
function checkCartItems() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    const cartKey = `cart_${currentUser.email}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    
    // Get all add to cart buttons
    const addButtons = document.querySelectorAll('.add-btn');
    
    // Check each button against cart items
    addButtons.forEach(button => {
        const bookData = JSON.parse(button.getAttribute('data-book'));
        const isInCart = cart.some(item => item.id === bookData.id);
        
        if (isInCart) {
            button.textContent = 'Added';
            button.classList.remove('add-btn');
            button.classList.add('added-btn');
            button.disabled = true;
        }
    });
}
        async function searchBooks() {
            const query = document.getElementById("searchQuery").value;
            const url = query 
                ? `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}&maxResults=${maxResults}&startIndex=${startIndex}`
                : `https://www.googleapis.com/books/v1/volumes?q=NewReleaseBooks&key=${apiKey}&maxResults=${maxResults}`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                displayBooks(data.items);
            } catch (error) {
                console.error("Error fetching books:", error);
                alert("Failed to fetch books. Please try again.");
            }
        }

        

        function displayBooks(books) {
            const bookList = document.getElementById("bookList");
            bookList.innerHTML = "";  // Clear previous results

            if (!books || books.length === 0) {
                bookList.innerHTML = "<h2>No books found.</h2>";
                return;
            }

            books.forEach(book => {
                const bookInfo = book.volumeInfo;
                const thumbnail = bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : "Assets/content.jpeg";
                const title = bookInfo.title || "No title available";
                const authors = bookInfo.authors ? bookInfo.authors.join(", ") : "Donald Knuth";
                const price = book.saleInfo && book.saleInfo.listPrice ? book.saleInfo.listPrice.amount : 220.00;
                const bookDiv = document.createElement("div");
                bookDiv.className = "book";
                bookDiv.innerHTML = `
                    <img src="${thumbnail}" alt="${title}" />
                    <h3>${title}</h3>
                    <p>Author: ${authors}</p>
                    <p>Price: ₹${price.toFixed(2)}</p>
                    <button class="add-btn" onclick='addToCart({
                        "title": "${title.replace(/"/g, '&quot;')}",
                        "author": "${authors.replace(/"/g, '&quot;')}",
                        "thumbnail": "${thumbnail}",
                        "price": ${price}
                    })'>Add to Cart</button>
                `;
                bookList.appendChild(bookDiv);
            });
        }
      
        // Load 30 random books on initial load
        document.addEventListener("DOMContentLoaded", searchBooks);