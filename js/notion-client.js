/**
 * Notion API Client for Garden Oracle
 * Fetches seed data from Notion database
 */

class NotionClient {
    constructor() {
        // These will be loaded from environment or config
        this.notionToken = null;
        this.databaseId = null;
        this.baseUrl = 'https://api.notion.com/v1';
        this.notionVersion = '2022-06-28';
        this.cache = null;
        this.cacheTimestamp = null;
        this.cacheTTL = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
    }

    /**
     * Initialize with credentials
     */
    async init(token, databaseId) {
        this.notionToken = token;
        this.databaseId = databaseId;
        
        // Try to load from localStorage cache first
        this.loadFromCache();
    }

    /**
     * Fetch all seeds from Notion database with pagination
     */
    async fetchAllSeeds(pageSize = 100) {
        // Skip credential check if using proxy mode (credentials are 'proxy')
        if (this.notionToken !== 'proxy' && (!this.notionToken || !this.databaseId)) {
            throw new Error('Notion credentials not initialized');
        }

        console.log('Fetching seeds from Notion database...');
        
        const allSeeds = [];
        let hasMore = true;
        let startCursor = null;
        let pageCount = 0;

        try {
            while (hasMore) {
                const response = await this.queryDatabase(startCursor, pageSize);
                
                // Parse and add results
                const seeds = response.results.map(page => this.parseSeedPage(page));
                allSeeds.push(...seeds);
                
                // Update pagination
                hasMore = response.has_more;
                startCursor = response.next_cursor;
                pageCount++;
                
                console.log(`Fetched page ${pageCount}: ${seeds.length} seeds (total: ${allSeeds.length})`);
            }

            console.log(`Successfully fetched ${allSeeds.length} seeds in ${pageCount} pages`);
            
            // Save to cache
            this.saveToCache(allSeeds);
            
            return allSeeds;

        } catch (error) {
            console.error('Error fetching seeds from Notion:', error);
            throw error;
        }
    }

    /**
     * Query Notion database via proxy server
     */
    async queryDatabase(startCursor = null, pageSize = 100) {
        // Use local proxy server to avoid CORS issues
        const url = '/api/notion/query';
        
        const body = {
            page_size: pageSize
        };
        
        if (startCursor) {
            body.start_cursor = startCursor;
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Notion API error: ${error.error || response.statusText}`);
        }

        return await response.json();
    }

    /**
     * Parse a Notion page into a structured seed record
     */
    parseSeedPage(page) {
        const properties = page.properties || {};
        
        const seed = {
            id: page.id,
            created_time: page.created_time,
            last_edited_time: page.last_edited_time,
            url: page.url
        };

        // Parse each property type
        for (const [propName, propData] of Object.entries(properties)) {
            const propType = propData.type;
            
            switch (propType) {
                case 'title':
                    seed[propName] = this.getTitle(propData);
                    break;
                case 'rich_text':
                    seed[propName] = this.getRichText(propData);
                    break;
                case 'select':
                    seed[propName] = this.getSelect(propData);
                    break;
                case 'multi_select':
                    seed[propName] = this.getMultiSelect(propData);
                    break;
                case 'date':
                    seed[propName] = this.getDate(propData);
                    break;
                case 'number':
                    seed[propName] = this.getNumber(propData);
                    break;
                case 'checkbox':
                    seed[propName] = this.getCheckbox(propData);
                    break;
                case 'url':
                    seed[propName] = this.getUrl(propData);
                    break;
                case 'email':
                    seed[propName] = this.getEmail(propData);
                    break;
                case 'phone_number':
                    seed[propName] = this.getPhone(propData);
                    break;
                case 'relation':
                    seed[propName] = this.getRelation(propData);
                    break;
                case 'formula':
                    seed[propName] = this.getFormula(propData);
                    break;
                default:
                    seed[propName] = null;
            }
        }

        return seed;
    }

    // Property parsers
    getTitle(prop) {
        const titleList = prop.title || [];
        return titleList.map(t => t.plain_text || '').join('');
    }

    getRichText(prop) {
        const textList = prop.rich_text || [];
        return textList.map(t => t.plain_text || '').join('');
    }

    getSelect(prop) {
        return prop.select?.name || null;
    }

    getMultiSelect(prop) {
        const multiSelect = prop.multi_select || [];
        return multiSelect.map(item => item.name);
    }

    getDate(prop) {
        const date = prop.date;
        if (date) {
            return {
                start: date.start,
                end: date.end
            };
        }
        return null;
    }

    getNumber(prop) {
        return prop.number;
    }

    getCheckbox(prop) {
        return prop.checkbox || false;
    }

    getUrl(prop) {
        return prop.url;
    }

    getEmail(prop) {
        return prop.email;
    }

    getPhone(prop) {
        return prop.phone_number;
    }

    getRelation(prop) {
        const relation = prop.relation || [];
        return relation.map(item => item.id);
    }

    getFormula(prop) {
        const formula = prop.formula || {};
        const formulaType = formula.type;
        if (formulaType) {
            return formula[formulaType];
        }
        return null;
    }

    /**
     * Save seeds to localStorage cache
     */
    saveToCache(seeds) {
        try {
            const cacheData = {
                seeds: seeds,
                timestamp: Date.now(),
                databaseId: this.databaseId
            };
            localStorage.setItem('notion_seeds_cache', JSON.stringify(cacheData));
            this.cache = seeds;
            this.cacheTimestamp = Date.now();
            console.log(`Saved ${seeds.length} seeds to cache`);
        } catch (error) {
            console.error('Error saving to cache:', error);
        }
    }

    /**
     * Load seeds from localStorage cache
     */
    loadFromCache() {
        try {
            const cached = localStorage.getItem('notion_seeds_cache');
            if (cached) {
                const cacheData = JSON.parse(cached);
                this.cache = cacheData.seeds;
                this.cacheTimestamp = cacheData.timestamp;
                console.log(`Loaded ${this.cache.length} seeds from cache`);
                return this.cache;
            }
        } catch (error) {
            console.error('Error loading from cache:', error);
        }
        return null;
    }

    /**
     * Check if cache should be refreshed
     */
    shouldRefreshCache() {
        if (!this.cache || !this.cacheTimestamp) {
            return true;
        }
        
        const age = Date.now() - this.cacheTimestamp;
        const shouldRefresh = age > this.cacheTTL;
        
        console.log(`Cache age: ${Math.round(age / 1000 / 60)} minutes, should refresh: ${shouldRefresh}`);
        
        return shouldRefresh;
    }

    /**
     * Sync seeds from Notion, using cache if available and fresh
     */
    async sync(force = false) {
        // Check if we should use cache
        if (!force && !this.shouldRefreshCache()) {
            if (this.cache) {
                console.log('Using cached seeds (fresh)');
                return this.cache;
            }
        }

        // Fetch fresh data
        console.log('Fetching fresh data from Notion');
        const seeds = await this.fetchAllSeeds();
        
        return seeds;
    }

    /**
     * Get seeds with optional filtering
     */
    getSeeds(filters = {}) {
        if (!this.cache) {
            console.warn('No seeds in cache. Call sync() first.');
            return [];
        }

        let filtered = [...this.cache];

        // Apply filters
        if (filters.type) {
            filtered = filtered.filter(seed => 
                seed.Type === filters.type || seed['Plant Type'] === filters.type
            );
        }

        if (filters.season) {
            filtered = filtered.filter(seed => {
                const plantingSeason = seed['Planting Season'] || seed.Season;
                return plantingSeason && plantingSeason.includes(filters.season);
            });
        }

        if (filters.moonPhase) {
            filtered = filtered.filter(seed => {
                const moonPhase = seed['Moon Phase'] || seed['Best Moon Phase'];
                return moonPhase && moonPhase.includes(filters.moonPhase);
            });
        }

        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(seed => {
                const name = (seed.Name || seed.name || '').toLowerCase();
                const variety = (seed.Variety || seed.variety || '').toLowerCase();
                const notes = (seed.Notes || seed.notes || '').toLowerCase();
                return name.includes(searchLower) || 
                       variety.includes(searchLower) || 
                       notes.includes(searchLower);
            });
        }

        return filtered;
    }

    /**
     * Get planting recommendations for current moon phase
     */
    getPlantingRecommendations(moonPhase, limit = 10) {
        const seeds = this.getSeeds({ moonPhase });
        return seeds.slice(0, limit);
    }

    /**
     * Clear cache
     */
    clearCache() {
        localStorage.removeItem('notion_seeds_cache');
        this.cache = null;
        this.cacheTimestamp = null;
        console.log('Cache cleared');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NotionClient;
}

// Made with Bob
