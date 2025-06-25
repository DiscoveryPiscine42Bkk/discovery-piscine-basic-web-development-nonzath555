// Get a reference to the button and the body element
const colorChangeBtn = document.getElementById('colorChangeBtn');
const body = document.body;

/**
 * Generates a random hexadecimal color string.
 * @returns {string} A string representing a random hex color (e.g., "#RRGGBB").
 */
function getRandomColor() {
    // Generate a random number between 0 and 16777215 (FFFFFF in hex)
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    // Pad the color string with leading zeros if necessary to ensure 6 digits
    return "#" + randomColor.padStart(6, '0');
}

// Add an event listener to the button for the 'click' event
colorChangeBtn.addEventListener('click', () => {
    // When the button is clicked, change the body's background color
    body.style.backgroundColor = getRandomColor();
});

// Set an initial random background color when the page loads
document.addEventListener('DOMContentLoaded', () => {
    body.style.backgroundColor = getRandomColor();
});