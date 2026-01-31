/**
 * About Page Controller
 * Handles hamburger menu functionality
 */

class AboutPage {
    constructor() {
        this.init();
    }

    init() {
        console.log('Initializing About Page...');
        this.setupHamburgerMenu();
    }

    setupHamburgerMenu() {
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
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AboutPage();
});

// Made with Bob
