/**
 * Configuration loader for Garden Weather Oracle
 * Loads environment variables and API credentials
 */

class Config {
    constructor() {
        this.notionToken = null;
        this.notionDatabaseId = null;
        this.loaded = false;
    }

    /**
     * Load configuration from .env file
     * Note: Browser can't read .env files directly, so we skip this
     * Credentials are set manually in seeds.js
     */
    async loadFromEnv() {
        // Browser security prevents reading .env files
        // Credentials will be set manually
        console.log('⚠️ Using manual configuration (browser environment)');
        return false;
    }

    /**
     * Set credentials manually (for development/testing)
     */
    setCredentials(token, databaseId) {
        this.notionToken = token;
        this.notionDatabaseId = databaseId;
        this.loaded = true;
        console.log('✅ Credentials set manually');
    }

    /**
     * Get Notion token
     */
    getNotionToken() {
        if (!this.loaded) {
            console.warn('Configuration not loaded yet');
        }
        return this.notionToken;
    }

    /**
     * Get Notion database ID
     */
    getNotionDatabaseId() {
        if (!this.loaded) {
            console.warn('Configuration not loaded yet');
        }
        return this.notionDatabaseId;
    }

    /**
     * Check if configuration is loaded
     */
    isLoaded() {
        return this.loaded && this.notionToken && this.notionDatabaseId;
    }
}

// Create singleton instance
const config = new Config();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
}

// Made with Bob
