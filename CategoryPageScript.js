// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
   

    /** 
     * Sort Products Functionality
     * Allows sorting products by price or name.
     */
    const sortProducts = () => {
        const sortOption = document.getElementById("sort-options").value;
        const productGrid = document.getElementById("product-grid");
        const products = Array.from(productGrid.getElementsByClassName("product-card"));

        // Sorting logic based on selected option
        products.sort((a, b) => {
            const nameA = a.getAttribute("data-name").toLowerCase();
            const nameB = b.getAttribute("data-name").toLowerCase();
            const priceA = parseFloat(a.getAttribute("data-price"));
            const priceB = parseFloat(b.getAttribute("data-price"));

            if (sortOption === "price-asc") {
                return priceA - priceB;
            } else if (sortOption === "price-desc") {
                return priceB - priceA;
            } else if (sortOption === "name-asc") {
                return nameA.localeCompare(nameB);
            } else if (sortOption === "name-desc") {
                return nameB.localeCompare(nameA);
            }
        });

        // Re-render sorted products in the grid
        products.forEach(product => productGrid.appendChild(product));
    };

    // Attach event listener for sorting
    document.getElementById("sort-options").addEventListener('change', sortProducts);
});





document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.product-card').forEach(card => {
        const decreaseButton = card.querySelector('.quantity-control1 .decrease');
        const increaseButton = card.querySelector('.quantity-control1 .increase');
        const quantityDisplay = card.querySelector('.quantity-control1 .quantity');
        const addButton = card.querySelector('.add-button');

        let quantity = 0; 

        
        increaseButton.addEventListener('click', () => {
            quantity++;
            quantityDisplay.textContent = quantity;
        });

        decreaseButton.addEventListener('click', () => {
            if (quantity > 0) { 
                quantity--;
                quantityDisplay.textContent = quantity;
            }
        });

        
        addButton.addEventListener('click', () => {
            if (quantity === 0) {
                alert('Please select a quantity greater than 0 before adding to the cart.');
                return; 
            }

            const productCard = addButton.closest('.product-card');
            const product = {
                name: productCard.getAttribute('data-name'),
                price: parseFloat(productCard.getAttribute('data-price')),
                image: productCard.querySelector('img').src,
                quantity: quantity
            };

            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItemIndex = cart.findIndex(item => item.name === product.name);

            if (existingItemIndex !== -1) {
                cart[existingItemIndex].quantity += product.quantity;
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${product.name} has been added to your cart.`);

            
            quantity = 0;
            quantityDisplay.textContent = quantity;
        });
    });
});
