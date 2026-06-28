// Load cart from local storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count when page loads
updateCartCount();


// Add product to cart
function addToCart(product) {

    cart.push(product);

    // Save cart
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart icon
    updateCartCount();

    alert(product + " added to cart!");
}


// Update cart counter
function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}


// Display cart items on cart.html
function displayCart() {

    const cartItems = document.getElementById("cart-items");
    const totalItems = document.getElementById("total-items");

    // Stop if not on cart page
    if (!cartItems) return;

    // Cart empty
    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

        if (totalItems) {
            totalItems.textContent = "Total Items: 0";
        }

        return;
    }

    // Show total items
    if (totalItems) {
        totalItems.textContent = "Total Items: " + cart.length;
    }

    // Clear previous content
    cartItems.innerHTML = "";

    // Display products
    cart.forEach((item, index) => {

        cartItems.innerHTML += `
            <div class="card">
                <h3>${item}</h3>

                <button class="cart-btn"
                onclick="removeItem(${index})">
                    Remove
                </button>
            </div>
        `;
    });
}


// Remove single item
function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    displayCart();
}


// Clear entire cart
function clearCart() {

    cart = [];

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    displayCart();
}


// Checkout on WhatsApp
function checkoutWhatsApp() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message =
        "Hello RIFUMO LUXE ESSENTIALS,%0A%0A" +
        "I would like to order:%0A";

    cart.forEach(item => {
        message += "- " + item + "%0A";
    });

    window.open(
        "https://wa.me/27768089626?text=" + message,
        "_blank"
    );
}


// Product Search
const searchInput = document.getElementById("searchInput");
const products = document.querySelectorAll(".product-card");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        let searchValue = searchInput.value.toLowerCase();

        products.forEach(function (product) {

            let text = product.textContent.toLowerCase();

            if (text.includes(searchValue)) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
    });
}


// Run cart display when page loads
displayCart();
