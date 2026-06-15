// Search functionality
const searchInput = document.getElementById("searchInput");
const products = document.querySelectorAll(".product-card");

if (searchInput) {
    searchInput.addEventListener("keyup", function() {
        let searchValue = searchInput.value.toLowerCase();

        products.forEach(function(product) {
            let text = product.textContent.toLowerCase();

            if (text.includes(searchValue)) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
    });
}

// Shopping cart
let cart = [];

function addToCart(product) {
    cart.push(product);

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }

    alert(product + " added to cart!");
}
