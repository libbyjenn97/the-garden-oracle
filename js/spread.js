/**
 * Planting Spread Page Controller
 * Displays selected seeds in a tarot-like spread
 */

class PlantingSpread {
    constructor() {
        this.selectedSeeds = this.loadSelectedSeeds();
        this.deck = this.loadDeck();
    }

    loadSelectedSeeds() {
        try {
            const saved = localStorage.getItem('plantingSpread');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    }

    loadDeck() {
        try {
            const saved = localStorage.getItem('plantingDeck');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    }

    saveDeck() {
        try {
            localStorage.setItem('plantingDeck', JSON.stringify(this.deck));
        } catch (e) {
            console.error('Error saving deck:', e);
        }
    }

    init() {
        console.log('Initializing Planting Spread...');
        
        // Setup hamburger menu
        this.setupHamburgerMenu();
        
        // Display spread
        this.displaySpread();
        
        // Setup event listeners
        this.setupEventListeners();
    }

    setupHamburgerMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const menuDropdown = document.getElementById('menuDropdown');

        if (menuToggle && menuDropdown) {
            menuToggle.addEventListener('click', () => {
                menuDropdown.classList.toggle('hidden');
            });

            document.addEventListener('click', (e) => {
                if (!menuToggle.contains(e.target) && !menuDropdown.contains(e.target)) {
                    menuDropdown.classList.add('hidden');
                }
            });
        }
    }

    displaySpread() {
        const emptyState = document.getElementById('emptyState');
        const spreadDisplay = document.getElementById('spreadDisplay');
        const spreadGrid = document.getElementById('spreadGrid');
        const spreadCount = document.getElementById('spreadCount');

        if (this.selectedSeeds.length === 0) {
            emptyState.style.display = 'block';
            spreadDisplay.style.display = 'none';
            return;
        }

        emptyState.style.display = 'none';
        spreadDisplay.style.display = 'block';

        // Update count
        if (spreadCount) {
            spreadCount.textContent = `${this.selectedSeeds.length} seed${this.selectedSeeds.length !== 1 ? 's' : ''} in your spread`;
        }

        // Render cards
        spreadGrid.innerHTML = '';
        this.selectedSeeds.forEach((seed, index) => {
            const card = this.createSpreadCard(seed, index);
            spreadGrid.appendChild(card);
        });
    }

    createSpreadCard(seed, index) {
        const card = document.createElement('div');
        card.className = 'spread-card';

        // Extract all fields with multiple possible names
        const name = seed.Name || seed.name || 'Unknown';
        const variety = seed.Variety || seed.variety || '';
        const type = seed.Type || seed['Plant Type'] || seed.type || '';
        const moonPhase = seed['Ideal Moon Phase'] || seed['Moon Phase'] || '';
        
        // Classification fields
        const cropClass = seed['Above ground crop / Root Crop'] || '';
        const lifecycle = seed['Annual / Perennial'] || '';
        
        // Timing fields
        const plantMonth = seed['Plant Month'] || [];
        const seasons = seed['Season(s)'] || [];
        const daysToGerminate = seed['Days to Germination (Max)'] || seed['Days to Germinate'] || '';
        const harvestMin = seed['Harvest Min (weeks)'] || '';
        const harvestMax = seed['Harvest Max (weeks)'] || '';
        
        // Status fields
        const state = seed.State || [];
        const rating = seed.Rating || '';
        
        // Location & conditions
        const sowLocation = seed['Sow Location'] || [];
        const soilTempMin = seed['Soil Temperature (Min)'] || '';
        const soilTempMax = seed['Soil Temperature (Max)'] || '';

        // Helper function to format arrays
        const formatArray = (arr) => {
            if (Array.isArray(arr)) {
                return arr.join(', ');
            }
            return arr || '';
        };

        // Get moon phase display
        const moonPhaseDisplay = formatArray(moonPhase);

        let html = `
            <button class="spread-card-remove" data-index="${index}">×</button>
            <div class="spread-card-header">
                <div class="spread-card-name">${this.escapeHtml(name)}</div>
                ${variety ? `<div class="spread-card-variety">${this.escapeHtml(variety)}</div>` : ''}
            </div>
            <div class="spread-card-details">
        `;

        // Classification section
        if (type || cropClass || lifecycle) {
            html += '<div class="spread-card-section"><strong>Classification</strong></div>';
            
            if (type) {
                html += `<div class="spread-card-detail">
                    <span class="spread-card-detail-label">Type:</span>
                    <span>${this.escapeHtml(type)}</span>
                </div>`;
            }
            
            if (cropClass) {
                html += `<div class="spread-card-detail">
                    <span class="spread-card-detail-label">Crop:</span>
                    <span>${this.escapeHtml(cropClass)}</span>
                </div>`;
            }
            
            if (lifecycle) {
                html += `<div class="spread-card-detail">
                    <span class="spread-card-detail-label">Lifecycle:</span>
                    <span>${this.escapeHtml(lifecycle)}</span>
                </div>`;
            }
        }

        // Timing section
        if (plantMonth.length > 0 || seasons.length > 0 || daysToGerminate || harvestMin || harvestMax) {
            html += '<div class="spread-card-section"><strong>Timing</strong></div>';
            
            if (plantMonth.length > 0) {
                html += `<div class="spread-card-detail">
                    <span class="spread-card-detail-label">Plant Months:</span>
                    <span>${this.escapeHtml(formatArray(plantMonth))}</span>
                </div>`;
            }
            
            if (seasons.length > 0) {
                html += `<div class="spread-card-detail">
                    <span class="spread-card-detail-label">Seasons:</span>
                    <span>${this.escapeHtml(formatArray(seasons))}</span>
                </div>`;
            }
            
            if (daysToGerminate) {
                html += `<div class="spread-card-detail">
                    <span class="spread-card-detail-label">Germination:</span>
                    <span>${this.escapeHtml(String(daysToGerminate))} days</span>
                </div>`;
            }
            
            if (harvestMin || harvestMax) {
                const harvestRange = harvestMin && harvestMax ?
                    `${harvestMin}-${harvestMax} weeks` :
                    (harvestMin ? `${harvestMin}+ weeks` : `${harvestMax} weeks`);
                html += `<div class="spread-card-detail">
                    <span class="spread-card-detail-label">Harvest:</span>
                    <span>${this.escapeHtml(harvestRange)}</span>
                </div>`;
            }
        }

        // Growing conditions section
        if (sowLocation.length > 0 || soilTempMin || soilTempMax) {
            html += '<div class="spread-card-section"><strong>Growing Conditions</strong></div>';
            
            if (sowLocation.length > 0) {
                html += `<div class="spread-card-detail">
                    <span class="spread-card-detail-label">Sow:</span>
                    <span>${this.escapeHtml(formatArray(sowLocation))}</span>
                </div>`;
            }
            
            if (soilTempMin || soilTempMax) {
                const tempRange = soilTempMin && soilTempMax ?
                    `${soilTempMin}-${soilTempMax}°C` :
                    (soilTempMin ? `${soilTempMin}°C+` : `up to ${soilTempMax}°C`);
                html += `<div class="spread-card-detail">
                    <span class="spread-card-detail-label">Soil Temp:</span>
                    <span>${this.escapeHtml(tempRange)}</span>
                </div>`;
            }
        }

        // Status section
        if (state.length > 0 || rating) {
            html += '<div class="spread-card-section"><strong>Status</strong></div>';
            
            if (state.length > 0) {
                html += `<div class="spread-card-detail">
                    <span class="spread-card-detail-label">State:</span>
                    <span>${this.escapeHtml(formatArray(state))}</span>
                </div>`;
            }
            
            if (rating) {
                const ratingEmoji = rating === 'Excellent' ? '⭐⭐⭐' :
                                   rating === 'Good' ? '⭐⭐' :
                                   rating === 'Average' ? '⭐' : '';
                html += `<div class="spread-card-detail">
                    <span class="spread-card-detail-label">Rating:</span>
                    <span>${ratingEmoji} ${this.escapeHtml(rating)}</span>
                </div>`;
            }
        }

        html += '</div>';

        if (moonPhaseDisplay) {
            const moonIcon = this.getMoonIcon(moonPhaseDisplay);
            html += `<div class="spread-card-moon">${moonIcon} ${this.escapeHtml(moonPhaseDisplay)}</div>`;
        }

        card.innerHTML = html;

        // Add remove button handler
        const removeBtn = card.querySelector('.spread-card-remove');
        if (removeBtn) {
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.removeSeed(index);
            });
        }

        return card;
    }

    getMoonIcon(moonPhase) {
        const phase = String(moonPhase).toLowerCase();
        if (phase.includes('new moon')) return '🌑';
        if (phase.includes('waxing crescent')) return '🌒';
        if (phase.includes('first quarter') || phase.includes('half moon')) return '🌓';
        if (phase.includes('waxing gibbous')) return '🌔';
        if (phase.includes('full moon')) return '🌕';
        if (phase.includes('waning gibbous')) return '🌖';
        return '🌙';
    }

    removeSeed(index) {
        this.selectedSeeds.splice(index, 1);
        localStorage.setItem('plantingSpread', JSON.stringify(this.selectedSeeds));
        this.displaySpread();
    }

    clearSpread() {
        if (confirm('Clear all seeds from your spread?')) {
            this.selectedSeeds = [];
            localStorage.setItem('plantingSpread', JSON.stringify(this.selectedSeeds));
            this.displaySpread();
        }
    }

    addToDeck() {
        // Add current spread to deck with timestamp
        const spreadEntry = {
            id: Date.now(),
            date: new Date().toISOString(),
            seeds: [...this.selectedSeeds],
            count: this.selectedSeeds.length
        };

        this.deck.push(spreadEntry);
        this.saveDeck();

        // Clear the spread
        this.selectedSeeds = [];
        localStorage.setItem('plantingSpread', JSON.stringify(this.selectedSeeds));

        // Show success message
        this.showSuccessMessage();
    }

    showSuccessMessage() {
        const spreadDisplay = document.getElementById('spreadDisplay');
        const successMessage = document.getElementById('successMessage');

        spreadDisplay.style.display = 'none';
        successMessage.style.display = 'block';
    }

    setupEventListeners() {
        // Add to deck button
        const addToDeckButton = document.getElementById('addToDeckButton');
        if (addToDeckButton) {
            addToDeckButton.addEventListener('click', () => this.addToDeck());
        }

        // Clear spread button
        const clearSpreadButton = document.getElementById('clearSpreadButton');
        if (clearSpreadButton) {
            clearSpreadButton.addEventListener('click', () => this.clearSpread());
        }

        // View deck button
        const viewDeckButton = document.getElementById('viewDeckButton');
        if (viewDeckButton) {
            viewDeckButton.addEventListener('click', () => {
                window.location.href = 'deck.html';
            });
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const spread = new PlantingSpread();
    spread.init();
});

// Made with Bob
