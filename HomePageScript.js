
// Display current week's date
function displayCurrentWeekDate() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const difference = dayOfWeek === 0 ? 0 : dayOfWeek;
    const sunday = new Date(today.setDate(today.getDate() - difference));

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = sunday.toLocaleDateString('en-US', options);
    document.getElementById("current-week-date").innerText = `This week's start: ${formattedDate}`;
}






// Show all discounts when clicking "View All"
function showAllDiscounts(event) {
    event.preventDefault(); // Prevent the link from navigating
    const hiddenItems = document.querySelectorAll(".item.hidden");
    hiddenItems.forEach(item => {
        item.classList.remove("hidden");
    });
}







// Show review details on hover
function showReviewDetails(element) {
    const reviewId = element.id; 
    let detailsContent;

    // Customize the details based on the review ID
    if (reviewId === "review1") {
        detailsContent = `
            <p><strong>Customer:</strong> Sarah<br></p>
            <p><strong>Product:</strong> Apple Watch<br></p>
            <p><strong>Rating:</strong> ★★★★☆</p>
            <p>Love this watch! Stylish and keeps me motivated to stay active.</p>
        `;
    } else if (reviewId === "review2") {
        detailsContent = `
            <p><strong>Customer:</strong> Ahmed<br></p>
            <p><strong>Product:</strong> Dining Chair<br></p>
            <p><strong>Rating:</strong> ★★★★★</p>
            <p>Very comfortable and adds a classy touch to my dining room.</p>
        `;
    } else if (reviewId === "review3") {
        detailsContent = `
            <p><strong>Customer:</strong> Maryam<br></p>
            <p><strong>Product:</strong> Table Lamp<br></p>
            <p><strong>Rating:</strong> ★★★★★</p>
            <p>Beautiful lamp! Creates a cozy vibe in my living room.</p>
        `;
    }

    // Create a details div and append it to the review element
    const details = document.createElement("div");
    details.className = "review-details";
    details.innerHTML = detailsContent;
    element.appendChild(details);
}

// Hide review details
function hideReviewDetails(element) {
    const details = element.querySelector(".review-details");
    if (details) details.remove();
}



// Initialize
document.addEventListener("DOMContentLoaded", () => {
    displayCurrentWeekDate();
});








function toggleTheme() {
    const body = document.body;

   
    body.classList.toggle("dark-theme");

   
    const currentTheme = body.classList.contains("dark-theme") ? "dark" : "light";
    localStorage.setItem("theme", currentTheme);
}


function applySavedTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
    }
}


document.addEventListener("DOMContentLoaded", () => {
    applySavedTheme(); 
    document.getElementById("theme-toggle-button").addEventListener("click", toggleTheme); 
});