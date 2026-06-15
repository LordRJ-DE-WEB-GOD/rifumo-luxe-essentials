<script>
const searchInput = document.getElementById("searchInput");
const products = document.querySelectorAll(".product-card");

searchInput.addEventListener("keyup", function() {
    let searchValue = searchInput.value.toLowerCase();

    products.forEach(function(product) {
        let text = product.textContent.toLowerCase();

        if(text.includes(searchValue)){
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
});
</script>
