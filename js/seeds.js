/**
 * Seeds Page Controller
 * Manages seed inventory display and filtering
 */

class SeedsPage {
    constructor() {
        this.notionClient = new NotionClient();
        this.allSeeds = [];
        this.filteredSeeds = [];
        this.selectedSeeds = this.loadSelectedSeeds();
        this.currentFilters = {
            search: '',
            type: '',
            month: '',
            moonPhase: ''
        };
    }

    loadSelectedSeeds() {
        try {
            const saved = localStorage.getItem('plantingSpread');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    }

    saveSelectedSeeds() {
        try {
            localStorage.setItem('plantingSpread', JSON.stringify(this.selectedSeeds));
        } catch (e) {
            console.error('Error saving selection:', e);
        }
    }

    toggleSeedSelection(seed) {
        const index = this.selectedSeeds.findIndex(s => s.id === seed.id);
        if (index > -1) {
            this.selectedSeeds.splice(index, 1);
        } else {
            this.selectedSeeds.push(seed);
        }
        this.saveSelectedSeeds();
        this.updateSelectionUI();
    }

    updateSelectionUI() {
        // Update all seed cards to show selection state
        document.querySelectorAll('.seed-card').forEach(card => {
            const seedId = card.dataset.seedId;
            const isSelected = this.selectedSeeds.some(s => s.id === seedId);
            card.classList.toggle('selected', isSelected);
        });

        // Update selection counter
        const counter = document.getElementById('selectionCounter');
        if (counter) {
            counter.textContent = `${this.selectedSeeds.length} selected`;
            counter.style.display = this.selectedSeeds.length > 0 ? 'block' : 'none';
        }

        // Show/hide selection actions panel
        const actionsPanel = document.getElementById('selectionActions');
        if (actionsPanel) {
            actionsPanel.style.display = this.selectedSeeds.length > 0 ? 'block' : 'none';
        }
    }

    async init() {
        console.log('Initializing Seeds Page...');
        
        // Setup hamburger menu
        this.setupHamburgerMenu();
        
        // Load configuration
        await this.loadConfiguration();
        
        // Load seeds
        await this.loadSeeds();
        
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

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!menuToggle.contains(e.target) && !menuDropdown.contains(e.target)) {
                    menuDropdown.classList.add('hidden');
                }
            });
        }
    }

    getCurrentMoonPhase() {
        // Use same calculation as moon.js
        const now = new Date();
        const knownNewMoon = new Date(Date.UTC(2000, 0, 6, 18, 14, 0));
        const lunarCycle = 29.53058867;
        const daysSinceKnownNew = (now - knownNewMoon) / (1000 * 60 * 60 * 24);
        const cyclePosition = daysSinceKnownNew % lunarCycle;
        const phase = cyclePosition / lunarCycle;

        // Map to Notion database values
        if (phase < 0.0625) return 'New Moon (Waxing)';
        if (phase < 0.1875) return 'Waxing Crescent';
        if (phase < 0.3125) return 'First Quarter Half Moon (Waxing)';
        if (phase < 0.4375) return 'Waxing Gibbous';
        if (phase < 0.5625) return 'Full Moon (Waning)';
        if (phase < 0.6875) return 'Waning Gibbous';
        // Note: Your database doesn't have Last Quarter or Waning Crescent
        // So we'll map them to the closest available phases
        if (phase < 0.8125) return 'Waning Gibbous'; // Last Quarter → Waning Gibbous
        if (phase < 0.9375) return 'New Moon (Waxing)'; // Waning Crescent → New Moon
        return 'New Moon (Waxing)';
    }

    getCurrentMonth() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
        return months[new Date().getMonth()];
    }

    getCurrentMonth() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
        return months[new Date().getMonth()];
    }

    async loadConfiguration() {
        console.log('Loading configuration...');
        
        // Check if backend has credentials configured
        try {
            const response = await fetch('/api/config');
            const backendConfig = await response.json();
            
            if (backendConfig.useProxy && backendConfig.notion_configured) {
                console.log('✅ Using backend proxy for Notion API');
                // Backend will handle all Notion API calls
                // Initialize NotionClient with proxy mode
                config.setCredentials('proxy', 'proxy');
                await this.notionClient.init('proxy', 'proxy');
                return;
            }
        } catch (error) {
            console.warn('Could not reach backend config endpoint:', error);
        }
        
        // Fallback: Try to load from .env file (for local development)
        const loaded = await config.loadFromEnv();
        
        if (!loaded) {
            // Credentials must be set in .env file or backend
            console.error('ERROR: Notion credentials not found. Please set NOTION_TOKEN and NOTION_DATABASE_ID environment variables on the server.');
            return;
        }

        // Initialize Notion client with credentials
        await this.notionClient.init(
            config.getNotionToken(),
            config.getNotionDatabaseId()
        );
    }

    async loadSeeds(force = false) {
        const loadingState = document.getElementById('loadingState');
        const errorState = document.getElementById('errorState');
        const seedsControls = document.getElementById('seedsControls');
        const seedsGrid = document.getElementById('seedsGrid');

        try {
            // Show loading
            loadingState.style.display = 'block';
            errorState.style.display = 'none';
            seedsControls.style.display = 'none';
            seedsGrid.style.display = 'none';

            // Sync seeds from Notion
            this.allSeeds = await this.notionClient.sync(force);
            
            // Populate type filter
            this.populateTypeFilter();
            
            // Debug: Log unique moon phase values from database
            this.logUniqueMoonPhases();
            
            // Display current conditions but don't auto-filter
            // This way users see all seeds by default
            const currentMoonPhase = this.getCurrentMoonPhase();
            const currentMonth = this.getCurrentMonth();
            this.displayCurrentConditions(currentMoonPhase, currentMonth);
            
            // Apply filters and render (no filters set, shows all)
            this.applyFilters();
            
            // Update UI
            loadingState.style.display = 'none';
            seedsControls.style.display = 'block';
            seedsGrid.style.display = 'grid';
            
            // Update cache info
            this.updateCacheInfo();
            
            console.log(`✅ Loaded ${this.allSeeds.length} seeds`);

        } catch (error) {
            console.error('Error loading seeds:', error);
            
            // Show error
            loadingState.style.display = 'none';
            errorState.style.display = 'block';
            
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.textContent = error.message || 'Failed to load seeds from Notion';
        }
    }
    

    displayCurrentConditions(moonPhase, month) {
        const currentConditions = document.getElementById('currentConditions');
        const currentMoonPhaseEl = document.getElementById('currentMoonPhase');
        const currentSeasonEl = document.getElementById('currentSeason');
        
        if (currentConditions && currentMoonPhaseEl && currentSeasonEl) {
            const moonIcon = this.getMoonIcon(moonPhase);
            currentMoonPhaseEl.textContent = `${moonIcon} ${moonPhase}`;
            currentSeasonEl.textContent = `📅 ${month}`;
            currentConditions.style.display = 'flex';
        }
    }

    logUniqueMoonPhases() {
        const moonPhases = new Set();
        const moonPhaseFields = new Set();
        
        this.allSeeds.forEach(seed => {
            // Check all possible moon phase field names
            const possibleFields = ['Moon Phase', 'Best Moon Phase', 'moonPhase', 'moon_phase', 'Planting Moon Phase'];
            
            possibleFields.forEach(field => {
                if (seed[field]) {
                    moonPhaseFields.add(field);
                    const value = seed[field];
                    if (Array.isArray(value)) {
                        value.forEach(v => moonPhases.add(v));
                    } else {
                        moonPhases.add(value);
                    }
                }
            });
        });
        
        console.log('🌙 Moon Phase Fields Found:', Array.from(moonPhaseFields));
        console.log('🌙 Unique Moon Phase Values:', Array.from(moonPhases).sort());
    }

    populateTypeFilter() {
        const typeFilter = document.getElementById('typeFilter');
        const types = new Set();
        
        this.allSeeds.forEach(seed => {
            const type = seed.Type || seed['Plant Type'] || seed.type;
            if (type) {
                types.add(type);
            }
        });
        
        // Clear existing options (except "All Types")
        while (typeFilter.options.length > 1) {
            typeFilter.remove(1);
        }
        
        // Add type options
        Array.from(types).sort().forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            typeFilter.appendChild(option);
        });
    }

    applyFilters() {
        // Get filter values
        this.currentFilters.search = document.getElementById('searchInput')?.value.toLowerCase() || '';
        this.currentFilters.type = document.getElementById('typeFilter')?.value || '';
        this.currentFilters.month = document.getElementById('monthFilter')?.value || '';
        this.currentFilters.moonPhase = document.getElementById('moonPhaseFilter')?.value || '';

        console.log('🔍 Applying filters:', this.currentFilters);

        // Filter seeds
        this.filteredSeeds = this.allSeeds.filter(seed => {
            // Search filter
            if (this.currentFilters.search) {
                const name = (seed.Name || seed.name || '').toLowerCase();
                const variety = (seed.Variety || seed.variety || '').toLowerCase();
                const notes = (seed.Notes || seed.notes || '').toLowerCase();
                
                if (!name.includes(this.currentFilters.search) && 
                    !variety.includes(this.currentFilters.search) && 
                    !notes.includes(this.currentFilters.search)) {
                    return false;
                }
            }

            // Type filter
            if (this.currentFilters.type) {
                const type = seed.Type || seed['Plant Type'] || seed.type;
                if (type !== this.currentFilters.type) {
                    return false;
                }
            }

            // Month filter
            if (this.currentFilters.month) {
                const plantingMonth = seed['Planting Month'] || seed['Plant Month'] || seed.Month || seed.month || '';
                if (!plantingMonth.includes(this.currentFilters.month)) {
                    return false;
                }
            }

            // Moon phase filter
            if (this.currentFilters.moonPhase) {
                const moonPhase = seed['Ideal Moon Phase'] || seed['Moon Phase'] || seed['Best Moon Phase'] || seed.moonPhase || '';
                
                // Handle array or string
                let moonPhaseStr = '';
                if (Array.isArray(moonPhase)) {
                    moonPhaseStr = moonPhase.join(' ');
                } else {
                    moonPhaseStr = String(moonPhase);
                }
                
                // Debug first seed that doesn't match
                if (!moonPhaseStr.includes(this.currentFilters.moonPhase)) {
                    if (this.filteredSeeds.length === 0) {
                        console.log('❌ First non-match:', {
                            seedName: seed.Name || seed.name,
                            moonPhaseInSeed: moonPhaseStr,
                            moonPhaseType: Array.isArray(moonPhase) ? 'array' : typeof moonPhase,
                            lookingFor: this.currentFilters.moonPhase,
                            allMoonPhaseFields: {
                                'Ideal Moon Phase': seed['Ideal Moon Phase'],
                                'Moon Phase': seed['Moon Phase'],
                                'Best Moon Phase': seed['Best Moon Phase'],
                                'moonPhase': seed.moonPhase
                            }
                        });
                    }
                    return false;
                }
            }

            return true;
        });

        console.log(`✅ Filtered: ${this.filteredSeeds.length} of ${this.allSeeds.length} seeds`);
        
        // Show first matching seed for debugging
        if (this.filteredSeeds.length > 0 && this.currentFilters.moonPhase) {
            const firstMatch = this.filteredSeeds[0];
            console.log('✅ First match:', {
                seedName: firstMatch.Name || firstMatch.name,
                moonPhase: firstMatch['Moon Phase'] || firstMatch['Best Moon Phase'] || firstMatch.moonPhase
            });
        }
        
        // Render seeds
        this.renderSeeds();
        
        // Update count
        this.updateSeedCount();
    }

    renderSeeds() {
        const seedsGrid = document.getElementById('seedsGrid');
        const emptyState = document.getElementById('emptyState');

        if (this.filteredSeeds.length === 0) {
            seedsGrid.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        seedsGrid.style.display = 'grid';
        emptyState.style.display = 'none';
        seedsGrid.innerHTML = '';

        this.filteredSeeds.forEach(seed => {
            const card = this.createSeedCard(seed);
            seedsGrid.appendChild(card);
        });
        
        // Update selection UI after rendering
        this.updateSelectionUI();
    }

    createSeedCard(seed) {
        const card = document.createElement('div');
        card.className = 'seed-card';
        card.dataset.seedId = seed.id;

        // Debug: Log all available fields for first seed
        if (!this._debugLogged) {
            console.log('Available seed fields:', Object.keys(seed));
            console.log('Sample seed data:', seed);
            this._debugLogged = true;
        }

        // Extract all seed properties - using exact Notion field names
        const name = seed.Name || seed.name || 'Unknown';
        const variety = seed.Variety || seed.variety || '';
        
        // Classification
        const type = seed.Type || seed['Plant Type'] || seed.type || '';
        const crop = seed['Above ground crop / Root Crop'] || seed.Crop || seed.crop || '';
        const lifecycle = seed['Annual / Perennial'] || seed.Lifecycle || seed.lifecycle || '';
        
        // Timing
        const plantMonth = seed['Plant Month'] || seed['Planting Month'] || seed.Month || seed.month || [];
        const seasons = seed['Season(s)'] || seed.Seasons || seed['Planting Season'] || seed.Season || seed.season || [];
        const daysToGerminate = seed['Days to Germination (Max)'] || seed['Days to Germinate'] || seed.daysToGerminate || '';
        const harvestMin = seed['Harvest Min (weeks)'] || '';
        const harvestMax = seed['Harvest Max (weeks)'] || '';
        const harvest = seed.Harvest || seed['Days to Harvest'] || seed.daysToHarvest || '';
        
        // Growing Conditions
        const sowLocation = seed['Sow Location'] || seed.Sow || seed.sow || [];
        const soilTempMin = seed['Soil Temperature (Min)'] || '';
        const soilTempMax = seed['Soil Temperature (Max)'] || '';
        const soilTemp = seed['Soil Temp'] || seed.soilTemp || '';
        const spacing = seed.Spacing || seed.spacing || '';
        const depth = seed.Depth || seed['Planting Depth'] || seed.depth || '';
        const sunlight = seed.Sunlight || seed.sunlight || '';
        const waterNeeds = seed['Water Needs'] || seed.waterNeeds || '';
        
        // Status
        const state = seed.State || seed.state || seed.Status || seed.status || [];
        const quantity = seed.Quantity || seed.quantity || '';
        const notes = seed.Notes || seed.notes || '';
        
        // Helper function to format arrays
        const formatArray = (arr) => {
            if (Array.isArray(arr)) {
                return arr.join(', ');
            }
            return arr || '';
        };

        // Build card HTML - Always visible header
        let html = `
            <div class="seed-card-header">
                <div class="seed-name">${this.escapeHtml(name)}</div>
                ${variety ? `<div class="seed-variety">${this.escapeHtml(variety)}</div>` : ''}
            </div>
        `;

        // Always visible: Classification section
        html += '<div class="seed-section">';
        html += '<div class="seed-section-title">Classification</div>';
        
        if (type) {
            html += `
                <div class="seed-detail">
                    <span class="seed-detail-label">Type:</span>
                    <span>${this.escapeHtml(type)}</span>
                </div>
            `;
        }
        
        if (crop) {
            html += `
                <div class="seed-detail">
                    <span class="seed-detail-label">Crop:</span>
                    <span>${this.escapeHtml(formatArray(crop))}</span>
                </div>
            `;
        }
        
        if (lifecycle) {
            html += `
                <div class="seed-detail">
                    <span class="seed-detail-label">Lifecycle:</span>
                    <span>${this.escapeHtml(formatArray(lifecycle))}</span>
                </div>
            `;
        }
        
        html += '</div>';

        // Expandable sections
        html += '<div class="seed-details-expanded" style="display: none;">';

        // Timing section
        html += '<div class="seed-section">';
        html += '<div class="seed-section-title">Timing</div>';
        
        if (plantMonth && (Array.isArray(plantMonth) ? plantMonth.length > 0 : plantMonth)) {
            html += `
                <div class="seed-detail">
                    <span class="seed-detail-label">Plant Months:</span>
                    <span>${this.escapeHtml(formatArray(plantMonth))}</span>
                </div>
            `;
        }
        
        if (seasons && (Array.isArray(seasons) ? seasons.length > 0 : seasons)) {
            html += `
                <div class="seed-detail">
                    <span class="seed-detail-label">Seasons:</span>
                    <span>${this.escapeHtml(formatArray(seasons))}</span>
                </div>
            `;
        }
        
        if (daysToGerminate) {
            html += `
                <div class="seed-detail">
                    <span class="seed-detail-label">Germination:</span>
                    <span>${this.escapeHtml(String(daysToGerminate))} days</span>
                </div>
            `;
        }
        
        if (harvest) {
            html += `
                <div class="seed-detail">
                    <span class="seed-detail-label">Harvest:</span>
                    <span>${this.escapeHtml(String(harvest))}</span>
                </div>
            `;
        } else if (harvestMin || harvestMax) {
            const harvestRange = harvestMin && harvestMax ?
                `${harvestMin}-${harvestMax} weeks` :
                (harvestMin ? `${harvestMin}+ weeks` : `${harvestMax} weeks`);
            html += `
                <div class="seed-detail">
                    <span class="seed-detail-label">Harvest:</span>
                    <span>${this.escapeHtml(harvestRange)}</span>
                </div>
            `;
        }
        
        html += '</div>';

        // Growing Conditions section
        html += '<div class="seed-section">';
        html += '<div class="seed-section-title">Growing Conditions</div>';
        
        if (sowLocation && (Array.isArray(sowLocation) ? sowLocation.length > 0 : sowLocation)) {
            html += `
                <div class="seed-detail">
                    <span class="seed-detail-label">Sow:</span>
                    <span>${this.escapeHtml(formatArray(sowLocation))}</span>
                </div>
            `;
        }
        
        if (soilTemp) {
            html += `
                <div class="seed-detail">
                    <span class="seed-detail-label">Soil Temp:</span>
                    <span>${this.escapeHtml(String(soilTemp))}</span>
                </div>
            `;
        } else if (soilTempMin || soilTempMax) {
            const tempRange = soilTempMin && soilTempMax ?
                `${soilTempMin}-${soilTempMax}°C` :
                (soilTempMin ? `${soilTempMin}°C+` : `up to ${soilTempMax}°C`);
            html += `
                <div class="seed-detail">
                    <span class="seed-detail-label">Soil Temp:</span>
                    <span>${this.escapeHtml(tempRange)}</span>
                </div>
            `;
        }
        
        if (spacing) {
            html += `
                <div class="seed-detail">
                    <span class="seed-detail-label">Spacing:</span>
                    <span>${this.escapeHtml(String(spacing))}</span>
                </div>
            `;
        }
        
        if (depth) {
            html += `
                <div class="seed-detail">
                    <span class="seed-detail-label">Depth:</span>
                    <span>${this.escapeHtml(String(depth))}</span>
                </div>
            `;
        }
        
        if (sunlight) {
            html += `
                <div class="seed-detail">
                    <span class="seed-detail-label">Sunlight:</span>
                    <span>${this.escapeHtml(String(sunlight))}</span>
                </div>
            `;
        }
        
        if (waterNeeds) {
            html += `
                <div class="seed-detail">
                    <span class="seed-detail-label">Water:</span>
                    <span>${this.escapeHtml(String(waterNeeds))}</span>
                </div>
            `;
        }
        
        html += '</div>';

        // Status section
        html += '<div class="seed-section">';
        html += '<div class="seed-section-title">Status</div>';
        
        if (state && (Array.isArray(state) ? state.length > 0 : state)) {
            const stateStr = formatArray(state);
            const stateClass = stateStr.toLowerCase().replace(/\s+/g, '-');
            html += `
                <div class="seed-detail">
                    <span class="seed-detail-label">State:</span>
                    <span class="seed-status ${stateClass}">${this.escapeHtml(stateStr)}</span>
                </div>
            `;
        }
        
        if (quantity) {
            html += `
                <div class="seed-detail">
                    <span class="seed-detail-label">Quantity:</span>
                    <span>${this.escapeHtml(String(quantity))}</span>
                </div>
            `;
        }
        
        html += '</div>';

        // Notes
        if (notes) {
            html += `<div class="seed-notes">${this.escapeHtml(notes)}</div>`;
        }

        html += '</div>'; // Close expanded section

        // Expand/collapse button
        html += `
            <button class="seed-expand-btn">
                <span class="expand-text">Show More</span>
                <span class="expand-icon">▼</span>
            </button>
        `;

        card.innerHTML = html;

        // Add expand/collapse functionality
        const expandBtn = card.querySelector('.seed-expand-btn');
        const expandedSection = card.querySelector('.seed-details-expanded');
        const expandText = card.querySelector('.expand-text');
        const expandIcon = card.querySelector('.expand-icon');

        expandBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = expandedSection.style.display !== 'none';
            
            if (isExpanded) {
                expandedSection.style.display = 'none';
                expandText.textContent = 'Show More';
                expandIcon.textContent = '▼';
                card.classList.remove('expanded');
            } else {
                expandedSection.style.display = 'block';
                expandText.textContent = 'Show Less';
                expandIcon.textContent = '▲';
                card.classList.add('expanded');
            }
        });

        // Add click handler for selection (on card, not button)
        card.addEventListener('click', (e) => {
            // Don't toggle if clicking the expand button
            if (e.target.closest('.seed-expand-btn')) {
                return;
            }
            this.toggleSeedSelection(seed);
        });

        return card;
    }

    getMoonIcon(moonPhase) {
        // Handle array or string
        if (!moonPhase) return '🌙';
        
        let phaseStr = '';
        if (Array.isArray(moonPhase)) {
            phaseStr = moonPhase.join(' ').toLowerCase();
        } else if (typeof moonPhase === 'string') {
            phaseStr = moonPhase.toLowerCase();
        } else {
            return '🌙';
        }
        
        if (phaseStr.includes('new moon')) return '🌑';
        if (phaseStr.includes('waxing crescent')) return '🌒';
        if (phaseStr.includes('first quarter') || phaseStr.includes('half moon')) return '🌓';
        if (phaseStr.includes('waxing gibbous')) return '🌔';
        if (phaseStr.includes('full moon')) return '🌕';
        if (phaseStr.includes('waning gibbous')) return '🌖';
        return '🌙';
    }

    updateSeedCount() {
        const seedCount = document.getElementById('seedCount');
        if (seedCount) {
            const total = this.allSeeds.length;
            const filtered = this.filteredSeeds.length;
            
            if (filtered === total) {
                seedCount.textContent = `${total} seed${total !== 1 ? 's' : ''}`;
            } else {
                seedCount.textContent = `${filtered} of ${total} seeds`;
            }
        }
    }

    updateCacheInfo() {
        const cacheInfo = document.getElementById('cacheInfo');
        if (cacheInfo && this.notionClient.cacheTimestamp) {
            const age = Date.now() - this.notionClient.cacheTimestamp;
            const minutes = Math.round(age / 1000 / 60);
            
            if (minutes < 60) {
                cacheInfo.textContent = `Updated ${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
            } else {
                const hours = Math.round(minutes / 60);
                cacheInfo.textContent = `Updated ${hours} hour${hours !== 1 ? 's' : ''} ago`;
            }
        }
    }

    setupEventListeners() {
        // Search input
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', () => this.applyFilters());
        }

        // Filter selects
        const typeFilter = document.getElementById('typeFilter');
        const monthFilter = document.getElementById('monthFilter');
        const moonPhaseFilter = document.getElementById('moonPhaseFilter');

        if (typeFilter) typeFilter.addEventListener('change', () => this.applyFilters());
        if (monthFilter) monthFilter.addEventListener('change', () => this.applyFilters());
        if (moonPhaseFilter) moonPhaseFilter.addEventListener('change', () => this.applyFilters());

        // Filter by current button
        const filterCurrentButton = document.getElementById('filterCurrentButton');
        if (filterCurrentButton) {
            filterCurrentButton.addEventListener('click', () => {
                const currentMoonPhase = this.getCurrentMoonPhase();
                const currentMonth = this.getCurrentMonth();
                
                // Set filters
                const moonPhaseFilter = document.getElementById('moonPhaseFilter');
                const monthFilter = document.getElementById('monthFilter');
                
                if (moonPhaseFilter) moonPhaseFilter.value = currentMoonPhase;
                if (monthFilter) monthFilter.value = currentMonth;
                
                // Apply filters
                this.applyFilters();
            });
        }

        // Clear filters button
        const clearFiltersButton = document.getElementById('clearFiltersButton');
        if (clearFiltersButton) {
            clearFiltersButton.addEventListener('click', () => {
                // Clear all filters
                const searchInput = document.getElementById('searchInput');
                const typeFilter = document.getElementById('typeFilter');
                const monthFilter = document.getElementById('monthFilter');
                const moonPhaseFilter = document.getElementById('moonPhaseFilter');
                
                if (searchInput) searchInput.value = '';
                if (typeFilter) typeFilter.value = '';
                if (monthFilter) monthFilter.value = '';
                if (moonPhaseFilter) moonPhaseFilter.value = '';
                
                // Apply filters (will show all)
                this.applyFilters();
            });
        }

        // Refresh button
        const refreshButton = document.getElementById('refreshButton');
        if (refreshButton) {
            refreshButton.addEventListener('click', () => this.loadSeeds(true));
        }

        // Retry button
        const retryButton = document.getElementById('retryButton');
        if (retryButton) {
            retryButton.addEventListener('click', () => this.loadSeeds(false));
        }

        // View spread button
        const viewSpreadButton = document.getElementById('viewSpreadButton');
        if (viewSpreadButton) {
            viewSpreadButton.addEventListener('click', () => {
                window.location.href = 'spread.html';
            });
        }

        // Clear selection button
        const clearSelectionButton = document.getElementById('clearSelectionButton');
        if (clearSelectionButton) {
            clearSelectionButton.addEventListener('click', () => {
                if (confirm('Clear all selected seeds?')) {
                    this.clearSelection();
                }
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
    const seedsPage = new SeedsPage();
    seedsPage.init();
});

// Made with Bob
