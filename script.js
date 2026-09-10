// =========================
// PRODUCT DATABASE
// =========================
// Note: Adidas Shoes is intentionally left out of this database.
// It's priced as "50% off" rather than a fixed Rand amount, so it's
// sold only via the direct WhatsApp order link on the page, not
// through the cart (a cart total needs a real number to add up).

const products = {
    "Glass Water Bottle": {
        price: 80,
        image: "glassbottle.jpg.jpg"
    },
    "Water Bottle": {
        price: 110,
        image: "waterbottle.jpg.jpg"
    },
    "Colorful Bottles (3pcs)": {
        price: 100,
        image: "colorfulbottles.jpg"
    },
    "Plastic Bottles (3pcs)": {
        price: 100,
        image: "plasticbottles.jpg.jpg"
    },
    "Coffee Mug": {
        price: 110,
        image: "coffeemug.webp"
    },
    "Thermal Cup": {
        price: 150,
        image: "thermalcup.jpg.jpg"
    },
    "Mini Fan": {
        price: 50,
        image: "minifan.jpg.jpg"
    },
    "Stitch Tumbler Cup": {
        price: 90,
        image: "stitchcup.jpg.jpg"
    },
    "Fluffy Animals Slippers": {
        price: 180,
        image: "fluffy-animal.jpg.jpg"
    },
    "Headphones": {
        price: 100,
        image: "headphones.jpg.jpg"
    },
    "Thermal Bottles": {
        price: 100,
        image: "thermal-bottle.jpg.webp"
    },
    "Hot Water Bottles": {
        price: 100,
        image: "hot-water-bottle.jpg.jpg"
    }
};

// =========================
// CART
// =========================

let cart = JSON.parse(localStorage.getItem("cart")) || {};

updateCartCount();

function addToCart(product) {

    if (!products[product]) {
        console.warn("Tried to add an unknown product:", product);
        return;
    }

    if (cart[product]) {
        cart[product]++;
    } else {
        cart[product] = 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(product + " added to cart!");
}

function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    let totalItems = 0;

    for (let item in cart) {
        totalItems += cart[item];
    }

    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

function displayCart() {

    const cartItems = document.getElementById("cart-items");
    const totalItems = document.getElementById("total-items");
    const totalPrice = document.getElementById("total-price");

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let itemCount = 0;
    let total = 0;

    for (let item in cart) {

        if (!products[item]) continue;

        let quantity = cart[item];
        let subtotal = products[item].price * quantity;

        itemCount += quantity;
        total += subtotal;

        cartItems.innerHTML += `
            <div class="card">

                <img src="${products[item].image}" alt="${item}">

                <h3>${item}</h3>

                <p><strong>Price:</strong> R${products[item].price}</p>

                <p><strong>Quantity:</strong></p>

                <button class="cart-btn"
                onclick="decreaseQuantity('${item}')">-</button>

                <span style="margin:0 10px;">${quantity}</span>

                <button class="cart-btn"
                onclick="increaseQuantity('${item}')">+</button>

                <p><strong>Subtotal:</strong> R${subtotal}</p>

                <button class="cart-btn"
                onclick="removeItem('${item}')">
                    Remove
                </button>

            </div>
        `;
    }

    if (itemCount === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    }

    if (totalItems) {
        totalItems.textContent = "Total Items: " + itemCount;
    }

    if (totalPrice) {
        totalPrice.textContent = "Total Price: R" + total;
    }
}

function increaseQuantity(product) {

    cart[product]++;

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    displayCart();
}

function decreaseQuantity(product) {

    cart[product]--;

    if (cart[product] <= 0) {
        delete cart[product];
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    displayCart();
}

function removeItem(product) {

    delete cart[product];

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    displayCart();
}

function clearCart() {

    cart = {};

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    displayCart();
}

function checkoutWhatsApp() {

    if (Object.keys(cart).length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = "Hello RIFUMO LUXE ESSENTIALS,\n\nI would like to order:\n";

    let total = 0;
    let itemCount = 0;

    for (let item in cart) {

        if (!products[item]) continue;

        let quantity = cart[item];
        let subtotal = products[item].price * quantity;

        message += "- " + item + " x" + quantity + " = R" + subtotal + "\n";

        total += subtotal;
        itemCount += quantity;
    }

    message += "\nTotal Items: " + itemCount + "\n";
    message += "Total Price: R" + total;

    // encodeURIComponent handles spaces, parentheses, newlines, etc.
    // correctly, unlike hand-building %20/%0A ourselves.
    const encodedMessage = encodeURIComponent(message);

    window.open(
        "https://wa.me/27768089626?text=" + encodedMessage,
        "_blank"
    );
}

// =========================
// PWA SERVICE WORKER
// =========================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("service-worker.js")
        .then(() => {
            console.log("Service Worker Registered");
        })
        .catch(err => {
            console.log("Service Worker Error:", err);
        });

    });
}

// =========================
// MOBILE MENU
// =========================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });
}

// =========================
// SEARCH BAR
// =========================

const searchInput = document.getElementById("searchInput");
const productCards = document.querySelectorAll(".product-card");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        let searchValue = searchInput.value.toLowerCase();

        productCards.forEach(function (product) {

            let text = product.textContent.toLowerCase();

            if (text.includes(searchValue)) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
    });
}

// =========================
// DARK / LIGHT MODE
// =========================
// Dark ("futuristic") is the default look now, so this toggle
// adds/removes a "light-mode" override class instead of the old
// "dark-mode" class.

const themeButton = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "light") {

    document.body.classList.add("light-mode");

    if (themeButton) {
        themeButton.textContent = "🌙 Dark Mode";
    }
}

if (themeButton) {

    themeButton.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {

            localStorage.setItem("theme", "light");
            themeButton.textContent = "🌙 Dark Mode";

        } else {

            localStorage.setItem("theme", "dark");
            themeButton.textContent = "☀️ Light Mode";
        }
    });
}

// =========================
// LOAD CART PAGE
// =========================

displayCart();
