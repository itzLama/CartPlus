document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const orderSelect = document.getElementById('select');
    const productSelect = document.getElementById('select1');
    const productImage = document.getElementById('product-image');
    const ratingStars = document.querySelectorAll('#rating-stars span');

    let selectedRating = 0;

    productImage.src = '';
    productImage.alt = 'No Product Selected';

    productSelect.addEventListener('change', () => {
        const selectedProduct = productSelect.value;

        if (selectedProduct === 'Apple Watch') {
            productImage.src = 'Images/Discount1.jpg';
            productImage.alt = 'Apple Watch';
            productImage.style.backgroundColor = 'transparent';
        } else if (selectedProduct === 'Dining Chair') {
            productImage.src = 'Images/Furniture3.jpg';
            productImage.alt = 'Dining Chair';
            productImage.style.backgroundColor = 'transparent';
        } else if (selectedProduct === 'Dyson Hair Styling Kit') {
            productImage.src = 'Images/Discount6.jpg';
            productImage.alt = 'Dyson Hair Styling Kit';
            productImage.style.backgroundColor = 'transparent';
        } else {
            productImage.src = '';
            productImage.alt = 'No Product Selected';
            productImage.style.backgroundColor = '#f9f9f9';
        }
    });

    ratingStars.forEach(star => {
        star.addEventListener('click', () => {
            selectedRating = star.getAttribute('data-value');
            ratingStars.forEach(s => s.classList.remove('selected'));
            for (let i = 0; i < selectedRating; i++) {
                ratingStars[i].classList.add('selected');
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let valid = true;
        let message = '';

        if (orderSelect.value === 'default') {
            message += 'Please select a valid order from the dropdown list.\n';
            valid = false;
        }

        if (productSelect.value=== 'default') {
            message += 'Please select a valid product from the dropdown list.\n';
            valid = false;
        }

        if (!selectedRating) {
            message += 'Please select a rating.\n';
            valid = false;
        }

        if (!valid) {
            alert(message);
            return;
        }

        alert(`Thank you for your feedback!\nYou rated product ${orderSelect.value} with ${selectedRating} out of 5.`);
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    });
});
