// Oracle card management
class OracleCards {
    constructor() {
        this.cards = [];
        this.currentCard = null;
    }

    async loadCards() {
        try {
            const response = await fetch('data/oracle-cards.json');
            const data = await response.json();
            this.cards = data.cards;
        } catch (error) {
            console.error('Error loading cards:', error);
            // Fallback to a sample card if loading fails
            this.cards = [{
                id: 1,
                name: "Spring Equinox",
                category: "celestial",
                keywords: ["balance", "renewal", "planting"],
                meaning: "Day and night balance perfectly. Plant with the turning of the wheel.",
                agent_prompt: "Focus on spring planting aligned with equinox timing"
            }];
        }
    }

    drawRandomCard() {
        if (this.cards.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * this.cards.length);
        this.currentCard = this.cards[randomIndex];
        return this.currentCard;
    }

    displayCard(card) {
        if (!card) return;

        // Update card content
        document.getElementById('cardName').textContent = card.name;
        document.getElementById('cardNumber').textContent = `+ ${card.id} +`;
        document.getElementById('cardMeaning').textContent = card.meaning;

        // Update illustration with SVG
        const svgIllustration = CardIllustrations.getSVG(card);
        document.querySelector('.card-illustration').innerHTML = svgIllustration;
    }

    generateReading(card, moonPhase) {
        if (!card) return '';

        // Create mystical reading combining card and moon phase
        const readings = [
            `The ${card.name} card appears under the ${moonPhase.name}. ${card.meaning} The lunar energy of ${moonPhase.name.toLowerCase()} amplifies this message, suggesting ${this.getMoonGuidance(moonPhase.name, card)}.`,
            
            `As the moon waxes in ${moonPhase.name}, ${card.name} reveals itself to you. ${card.meaning} This is a time for ${this.getActionGuidance(card.category)}.`,
            
            `${card.name} dances with the ${moonPhase.name} tonight. ${card.meaning} The cosmos whispers: ${this.getCosmicGuidance(card.keywords)}.`,
            
            `Under the gentle glow of the ${moonPhase.name}, ${card.name} emerges from the deck. ${card.meaning} Your garden calls for ${this.getGardenAction(card.category)}.`
        ];

        return readings[Math.floor(Math.random() * readings.length)];
    }

    getMoonGuidance(moonPhase, card) {
        const guidance = {
            "New Moon": `this is the perfect time to ${card.keywords[0]} and start fresh`,
            "Waxing Crescent": `growth energy supports your ${card.keywords[0]} intentions`,
            "First Quarter": `take decisive action on ${card.keywords[0]}`,
            "Waxing Gibbous": `patience with ${card.keywords[0]} will soon be rewarded`,
            "Full Moon": `celebrate the fullness of ${card.keywords[0]} in your garden`,
            "Waning Gibbous": `share your knowledge of ${card.keywords[0]} with others`,
            "Last Quarter": `release what no longer serves your ${card.keywords[0]} goals`,
            "Waning Crescent": `rest and reflect on ${card.keywords[0]} before the next cycle`
        };
        return guidance[moonPhase] || "trust in the natural cycles";
    }

    getActionGuidance(category) {
        const actions = {
            "celestial": "aligning with cosmic rhythms and honoring the seasons",
            "ritual": "sacred intention-setting and mindful planting",
            "action": "hands-in-soil work and practical garden tasks",
            "flora": "celebrating plant wisdom and botanical beauty",
            "fauna": "welcoming wildlife allies to your garden",
            "mystical": "connecting with the magical properties of plants"
        };
        return actions[category] || "tending your garden with love";
    }

    getCosmicGuidance(keywords) {
        const keyword = keywords[Math.floor(Math.random() * keywords.length)];
        return `embrace ${keyword} as your guiding principle for the days ahead`;
    }

    getGardenAction(category) {
        const actions = {
            "celestial": "planting aligned with lunar and solar cycles",
            "ritual": "blessing your seeds and creating sacred garden space",
            "action": "getting your hands dirty with purposeful work",
            "flora": "selecting plants that speak to your soul",
            "fauna": "creating habitat for beneficial creatures",
            "mystical": "growing herbs for magic and healing"
        };
        return actions[category] || "nurturing with intention";
    }
}

// Made with Bob
