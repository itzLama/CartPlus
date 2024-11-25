const form = document.querySelector('form');
const name = document.getElementById('name');
const price = document.getElementById('price');
const quantity = document.getElementById('quantity');
const category = document.getElementById('category');
const description = document.getElementById('description');
const imageInput = document.getElementById('image');
const imagePreview = document.getElementById('image-preview');
const uploadLabel = document.getElementById('upload-label');

imageInput.addEventListener('change', function () {
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            uploadLabel.style.display = 'none';
            imageInput.style.display = 'none';
            imagePreview.style.marginLeft = 'auto';
            imagePreview.style.marginRight = '50px';
            imagePreview.style.float = 'right';
        };
        reader.readAsDataURL(file);
    } else {
        imagePreview.style.display = 'none';
        uploadLabel.style.display = 'block';
        imageInput.style.display = 'block';
    }
});

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let valid = true;
    let message = '';

    if (name.value === '' || /^\d/.test(name.value)) {
        message += 'Name cannot be empty or start with a number.\n';
        valid = false;
    }

    if (price.value === '' || isNaN(price.value) || parseFloat(price.value) <= 0) {
        message += 'Price cannot be empty and must be a valid positive number.\n';
        valid = false;
    }

    if (category.value === '') {
        message += 'Please select a valid category.\n';
        valid = false;
    }

    if (quantity.value === '' || isNaN(quantity.value) || parseInt(quantity.value) <= 0) {
        message += 'Quantity cannot be empty and must be a valid positive number.\n';
        valid = false;
    }

    if (description.value === '' || description.value.length > 500) {
        message += 'Description cannot be empty and must not exceed 500 characters.\n';
        valid = false;
    }

    if (imageInput.files.length !== 1) {
        message += 'Please upload exactly one product image.\n';
        valid = false;
    }

    if (!valid) {
        alert(message);
        return;
    }

    const imageBase64 = await toBase64(imageInput.files[0]);

    const product = {
        name: name.value,
        price: parseFloat(price.value),
        quantity: parseInt(quantity.value),
        category: category.value,
        description: description.value,
        image: imageBase64,
    };

    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));

    alert(`The product "${product.name}" has been added successfully!`);
    setTimeout(() => {
        window.location.reload();
    }, 500);
});
