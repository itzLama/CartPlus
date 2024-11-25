document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items-container");
    const totalPriceDisplay = document.querySelector('.EmptyCart p strong');
    const totalItemsDisplay = document.querySelector('.checkout p strong');
    const emptyCartButton = document.querySelector('.EmptyCart button');
    const checkOutButton = document.querySelector('.checkout button');

    // Load cart from localStorage or initialize as empty
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to calculate totals
    function calculateTotal() {
        let totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        totalPriceDisplay.textContent = `Total Price: ${totalPrice} SAR`;
        totalItemsDisplay.textContent = `Total(${totalItems} Items): ${totalPrice} SAR`;
    }

    // Function to render cart items
    function renderCart() {
        cartItemsContainer.innerHTML = ""; // Clear existing items
        cart.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.className = "cart-item";
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" width="160" height="150">
                <h2>${item.name}</h2>
                <div class="quantity-control">
                    <button class="decrease" data-index="${index}">-</button>
                    <p class="quantity">${item.quantity}</p>
                    <button class="increase" data-index="${index}">+</button>
                </div>
                <p class="price"><strong>${item.price * item.quantity} SAR</strong></p>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        // Add event listeners for increase and decrease buttons
        document.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                cart[index].quantity++;
                localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart
                renderCart();
                calculateTotal();
            });
        });

        document.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                } else {
                    cart.splice(index, 1); // Remove item if quantity is 0
                }
                localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart
                renderCart();
                calculateTotal();
            });
        });

        calculateTotal(); // Update totals
    }

    // Empty cart functionality
    emptyCartButton.addEventListener('click', () => {
        cart = [];
        localStorage.removeItem('cart'); // Clear cart from localStorage
        renderCart();
        calculateTotal();
        alert('Your cart is empty. Time to start shopping!');
    });

    // Check-out functionality
    checkOutButton.addEventListener('click', () => {
        if (cart.length > 0) {
            alert(`Thank you for your purchase! Total Price: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)} SAR`);
            cart = [];
            localStorage.removeItem('cart'); // Clear cart
            renderCart();
            calculateTotal();
            window.location.href = "Product-evaluation.html"; // Redirect to another page
        } else {
            alert('Your cart is empty. Add some items first!');
        }
    });

    // Initial render on page load
    renderCart();
});
