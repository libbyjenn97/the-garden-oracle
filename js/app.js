// Main application logic
let moon;
let oracleCards;
let isCardFlipped = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize moon
    moon = new MoonPhase('moonCanvas');
    moon.updateDisplay();
    moon.animate();

    // Initialize oracle cards
    oracleCards = new OracleCards();
    
    // Wait for cards to load before enabling button
    await oracleCards.loadCards();

    // Set up event listeners
    setupEventListeners();
});

function setupEventListeners() {
    // Hamburger menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const menuDropdown = document.getElementById('menuDropdown');
    
    if (menuToggle && menuDropdown) {
        menuToggle.addEventListener('click', () => {
            menuDropdown.classList.toggle('hidden');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !menuDropdown.contains(e.target)) {
                menuDropdown.classList.add('hidden');
            }
        });
    }

    const drawButton = document.getElementById('drawButton');
    const cardBack = document.getElementById('cardBack');
    const cardFront = document.getElementById('cardFront');

    // Draw button click
    if (drawButton) {
        drawButton.addEventListener('click', () => {
            if (!isCardFlipped) {
                drawCard();
            } else {
                resetCard();
            }
        });
    }

    // Card back click to draw card
    if (cardBack) {
        cardBack.addEventListener('click', () => {
            if (!isCardFlipped) {
                // If card is not flipped, draw a card
                drawCard();
            } else {
                // If card is flipped, flip it back
                flipCard();
            }
        });
    }
}

function drawCard() {
    const drawButton = document.getElementById('drawButton');
    const cardBack = document.getElementById('cardBack');
    const cardFront = document.getElementById('cardFront');
    const reading = document.getElementById('reading');

    // Disable button during animation
    drawButton.disabled = true;
    drawButton.textContent = '✨ Drawing... ✨';

    // Add shuffle animation
    cardBack.style.animation = 'shuffle 0.5s ease-in-out';

    setTimeout(() => {
        // Draw random card
        const card = oracleCards.drawRandomCard();
        
        if (card) {
            // Display card content
            oracleCards.displayCard(card);

            // Flip the card
            setTimeout(() => {
                flipCard();
                
                // Show reading after flip
                setTimeout(() => {
                    const readingText = oracleCards.generateReading(card, moon.phase);
                    document.getElementById('readingText').textContent = readingText;
                    reading.classList.remove('hidden');
                    
                    // Update button
                    drawButton.textContent = '🔄 Draw Another Card';
                    drawButton.disabled = false;
                }, 800);
            }, 600);
        }

        cardBack.style.animation = '';
    }, 500);
}

function flipCard() {
    const cardBack = document.getElementById('cardBack');
    const cardFront = document.getElementById('cardFront');

    if (!isCardFlipped) {
        // Flip to front
        cardBack.classList.add('flipped');
        cardFront.classList.remove('hidden');
        setTimeout(() => {
            cardFront.classList.add('flipped');
        }, 50);
        isCardFlipped = true;
    } else {
        // Flip to back
        cardFront.classList.remove('flipped');
        setTimeout(() => {
            cardBack.classList.remove('flipped');
            cardFront.classList.add('hidden');
        }, 400);
        isCardFlipped = false;
    }
}

function resetCard() {
    const drawButton = document.getElementById('drawButton');
    const cardBack = document.getElementById('cardBack');
    const cardFront = document.getElementById('cardFront');
    const reading = document.getElementById('reading');

    // Hide reading
    reading.classList.add('hidden');

    // Flip back to card back
    if (isCardFlipped) {
        cardFront.classList.remove('flipped');
        setTimeout(() => {
            cardBack.classList.remove('flipped');
            cardFront.classList.add('hidden');
            isCardFlipped = false;
            
            // Update button
            drawButton.textContent = '✨ Draw Oracle Card ✨';
            
            // Ready for new draw
            setTimeout(() => {
                drawCard();
            }, 300);
        }, 400);
    }
}

// Add shuffle animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shuffle {
        0%, 100% { transform: translateX(0) rotate(0deg); }
        25% { transform: translateX(-10px) rotate(-5deg); }
        75% { transform: translateX(10px) rotate(5deg); }
    }
`;
document.head.appendChild(style);

// Made with Bob
