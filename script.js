// Load cart from local storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Product prices
const prices = {
    "Glass Water Bottle": 80,
    "Water Bottle": 110,
    "Colorful Bottles (3pcs)": 100,
    "Plastic Bottles (3pcs)": 100,
    "Coffee Mug": 110,
    "Thermal Cup": 150,
    "Mini Fan": 50,
    "Stitch Tumbler Cup": 90,
    "Fluffy Animals Slippers": 180,
    "Adidas Shoes": 0,
    "Headphones": 100,
    "Thermal Bottles": 100,
    "Hot Water Bottles": 100
};

// Update cart count when page loads
updateCartCount();

// Add product to cart
function addToCart(product) {

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(product + " added to cart!");
}

// Update cart icon count
function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Display cart items
function displayCart() {

    const cartItems = document.getElementById("cart-items");
    const totalItems = document.getElementById("total-items");
    const totalPrice = document.getElementById("total-price");

    // Stop if not on cart page
    if (!cartItems) return;

    // Empty cart
    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

        if (totalItems) {
            totalItems.textContent = "Total Items: 0";
        }

        if (totalPrice) {
            totalPrice.textContent = "Total Price: R0";
        }

        return;
    }

    // Show total items
    if (totalItems) {
        totalItems.textContent = "Total Items: " + cart.length;
    }

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += prices[item] || 0;

        cartItems.innerHTML += `
            <div class="card">
                <h3>${item}</h3>
                <p><strong>Price:</strong> R${prices[item] || 0}</p>

                <button class="cart-btn"
                onclick="removeItem(${index})">
                    Remove
                </button>
            </div>
        `;
    });

    if (totalPrice) {
        totalPrice.textContent = "Total Price: R" + total;
    }
}

// Remove one item
function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    displayCart();
}

// Clear all cart items
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

    let total = 0;

    let message =
        "Hello RIFUMO LUXE ESSENTIALS,%0A%0A" +
        "I would like to order:%0A";

    cart.forEach(item => {

        message += "- " + item + " (R" +
        (prices[item] || 0) + ")%0A";

        total += prices[item] || 0;
    });

    message += "%0ATotal Items: " + cart.length;
    message += "%0ATotal Price: R" + total;

    window.open(
        "https://wa.me/27768089626?text=" + message,
        "_blank"
    );
}

// Product search
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
