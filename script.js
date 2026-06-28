let cart = JSON.parse(localStorage.getItem("cart")) || [];

updateCartCount();

function addToCart(product) {

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(product + " added to cart!");
}

function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function displayCart() {

    const cartItems = document.getElementById("cart-items");

    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cartItems.innerHTML = "";

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

function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart",
    JSON.stringify(cart));

    updateCartCount();

    displayCart();
}

function checkoutWhatsApp() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message =
    "Hello RIFUMO LUXE ESSENTIALS,%0A%0AI would like to order:%0A";

    cart.forEach(item => {
        message += "- " + item + "%0A";
    });

    window.open(
    "https://wa.me/27768089626?text=" + message,
    "_blank");
}

displayCart();
