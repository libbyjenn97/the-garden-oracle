// SVG-based card illustrations
class CardIllustrations {
    static getSVG(card) {
        const svgMap = {
            // Celestial cards
            'Aquamarine': this.aquamarine(),
            'Aries': this.aries(),
            'Astrological New Year': this.astrologicalNewYear(),
            'Peach Moonstone': this.peachMoonstone(),
            'Pink Moon': this.pinkMoon(),
            'Spring Equinox': this.springEquinox(),
            
            // Ritual cards
            'Ancestral Lands': this.ancestralLands(),
            'Creating Altars': this.creatingAltars(),
            'Eostre': this.eostre(),
            'Sacred Circle': this.sacredCircle(),
            'Seed Blessing': this.seedBlessing(),
            
            // Action cards
            'Community Garden': this.communityGarden(),
            'Composting': this.composting(),
            'Eggshell Pots': this.eggshellPots(),
            'Garden Party': this.gardenParty(),
            'Germination': this.germination(),
            'Spring Cleaning': this.springCleaning(),
            'Terrarium': this.terrarium(),
            'Wreath Making': this.wreathMaking(),
            
            // Flora cards
            'Daffodils': this.daffodils(),
            'Irish Moss': this.irishMoss(),
            'Jasmine': this.jasmine(),
            'Mushrooms': this.mushrooms(),
            'Primrose': this.primrose(),
            
            // Fauna cards
            'Chicks': this.chicks(),
            'Grasshopper': this.grasshopper(),
            'Hare': this.hare(),
            'Lamb': this.lamb(),
            'Robin': this.robin(),
            
            // Mystical cards
            'Aromatherapy': this.aromatherapy(),
            'Floromancy': this.floromancy(),
            'Flower Wand': this.flowerWand(),
            'Hot Cross Buns': this.hotCrossBuns(),
            'Moon Milk': this.moonMilk(),
            'Plant Dyeing': this.plantDyeing(),
            'Shortbread': this.shortbread(),
            'Simmer Pot': this.simmerPot(),
            'Tea Party': this.teaParty(),
            
            // Additional cards
            'Easter Egg Hunt': this.easterEggHunt(),
            'Ostercierbaum': this.ostercierbaum(),
            'Painted Eggs': this.paintedEggs(),
            'Rainbow': this.rainbow(),
            'Spring Hike': this.springHike(),
            'Spring Rain': this.springRain()
        };
        
        return svgMap[card.name] || this.defaultIllustration();
    }
    
    // Celestial illustrations
    static aquamarine() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="aqua-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#b8d4c5;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#6b7c5d;stop-opacity:1" />
                </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="80" fill="url(#aqua-grad)" opacity="0.3"/>
            <path d="M100,40 L110,70 L140,70 L115,90 L125,120 L100,100 L75,120 L85,90 L60,70 L90,70 Z" 
                  fill="#b8d4c5" stroke="#6b7c5d" stroke-width="2"/>
            <circle cx="100" cy="100" r="15" fill="#d4af6a" opacity="0.6"/>
        </svg>`;
    }
    
    static pinkMoon() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="70" fill="#c9a9a3" opacity="0.3"/>
            <circle cx="100" cy="100" r="50" fill="#f4d4ba"/>
            <circle cx="85" cy="90" r="8" fill="#c9a9a3" opacity="0.4"/>
            <circle cx="110" cy="85" r="5" fill="#c9a9a3" opacity="0.4"/>
            <circle cx="95" cy="110" r="6" fill="#c9a9a3" opacity="0.4"/>
            <path d="M60,100 Q100,80 140,100" stroke="#d4af6a" stroke-width="2" fill="none" opacity="0.6"/>
        </svg>`;
    }
    
    static springEquinox() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="60" fill="#d4af6a" opacity="0.3"/>
            <line x1="100" y1="30" x2="100" y2="170" stroke="#6b7c5d" stroke-width="3"/>
            <line x1="30" y1="100" x2="170" y2="100" stroke="#6b7c5d" stroke-width="3"/>
            <circle cx="100" cy="100" r="20" fill="#f4d4ba"/>
            <path d="M100,50 L110,80 L100,70 L90,80 Z" fill="#8b9d83"/>
            <path d="M100,150 L110,120 L100,130 L90,120 Z" fill="#8b9d83"/>
        </svg>`;
    }
    
    // Flora illustrations
    static daffodils() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="daffodil-glow" cx="50%" cy="40%">
                    <stop offset="0%" style="stop-color:#f4d4ba;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#d4af6a;stop-opacity:0.2" />
                </radialGradient>
            </defs>
            <!-- Spring glow -->
            <circle cx="100" cy="80" r="60" fill="url(#daffodil-glow)"/>
            <!-- Three daffodils -->
            <!-- Left daffodil -->
            <ellipse cx="70" cy="75" rx="12" ry="16" fill="#d4af6a" opacity="0.9" transform="rotate(-20 70 75)"/>
            <ellipse cx="75" cy="65" rx="12" ry="16" fill="#d4af6a" opacity="0.9" transform="rotate(20 75 65)"/>
            <ellipse cx="85" cy="70" rx="12" ry="16" fill="#d4af6a" opacity="0.9" transform="rotate(60 85 70)"/>
            <ellipse cx="80" cy="82" rx="12" ry="16" fill="#d4af6a" opacity="0.9" transform="rotate(120 80 82)"/>
            <ellipse cx="68" cy="85" rx="12" ry="16" fill="#d4af6a" opacity="0.9" transform="rotate(180 68 85)"/>
            <ellipse cx="62" cy="78" rx="12" ry="16" fill="#d4af6a" opacity="0.9" transform="rotate(240 62 78)"/>
            <circle cx="72" cy="77" r="10" fill="#f4d4ba"/>
            <circle cx="72" cy="77" r="6" fill="#d4af6a" opacity="0.5"/>
            <!-- Center daffodil -->
            <ellipse cx="95" cy="70" rx="14" ry="18" fill="#d4af6a" opacity="0.9" transform="rotate(0 95 70)"/>
            <ellipse cx="110" cy="75" rx="14" ry="18" fill="#d4af6a" opacity="0.9" transform="rotate(60 110 75)"/>
            <ellipse cx="110" cy="92" rx="14" ry="18" fill="#d4af6a" opacity="0.9" transform="rotate(120 110 92)"/>
            <ellipse cx="95" cy="97" rx="14" ry="18" fill="#d4af6a" opacity="0.9" transform="rotate(180 95 97)"/>
            <ellipse cx="80" cy="92" rx="14" ry="18" fill="#d4af6a" opacity="0.9" transform="rotate(240 80 92)"/>
            <ellipse cx="80" cy="75" rx="14" ry="18" fill="#d4af6a" opacity="0.9" transform="rotate(300 80 75)"/>
            <circle cx="95" cy="83" r="12" fill="#f4d4ba"/>
            <circle cx="95" cy="83" r="7" fill="#d4af6a" opacity="0.5"/>
            <!-- Right daffodil -->
            <ellipse cx="120" cy="80" rx="11" ry="15" fill="#d4af6a" opacity="0.9" transform="rotate(30 120 80)"/>
            <ellipse cx="128" cy="72" rx="11" ry="15" fill="#d4af6a" opacity="0.9" transform="rotate(90 128 72)"/>
            <ellipse cx="132" cy="85" rx="11" ry="15" fill="#d4af6a" opacity="0.9" transform="rotate(150 132 85)"/>
            <ellipse cx="125" cy="95" rx="11" ry="15" fill="#d4af6a" opacity="0.9" transform="rotate(210 125 95)"/>
            <ellipse cx="115" cy="92" rx="11" ry="15" fill="#d4af6a" opacity="0.9" transform="rotate(270 115 92)"/>
            <circle cx="123" cy="85" r="9" fill="#f4d4ba"/>
            <circle cx="123" cy="85" r="5" fill="#d4af6a" opacity="0.5"/>
            <!-- Stems -->
            <path d="M72,90 Q70,110 68,140" stroke="#6b7c5d" stroke-width="3" fill="none"/>
            <path d="M95,100 Q95,120 93,145" stroke="#6b7c5d" stroke-width="3" fill="none"/>
            <path d="M123,95 Q125,115 127,140" stroke="#6b7c5d" stroke-width="3" fill="none"/>
            <!-- Leaves -->
            <ellipse cx="75" cy="120" rx="4" ry="15" fill="#8b9d83" transform="rotate(-20 75 120)"/>
            <ellipse cx="100" cy="125" rx="4" ry="15" fill="#8b9d83" transform="rotate(10 100 125)"/>
            <ellipse cx="120" cy="120" rx="4" ry="15" fill="#8b9d83" transform="rotate(20 120 120)"/>
            <!-- Sparkles -->
            <circle cx="60" cy="60" r="2" fill="#f4d4ba"/>
            <circle cx="135" cy="65" r="2" fill="#f4d4ba"/>
            <circle cx="100" cy="50" r="1.5" fill="#f4d4ba"/>
        </svg>`;
    }
    
    static jasmine() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="jasmine-glow" cx="50%" cy="50%">
                    <stop offset="0%" style="stop-color:#f5f1e8;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#c5b8d4;stop-opacity:0.2" />
                </radialGradient>
            </defs>
            <!-- Night-blooming aura -->
            <circle cx="100" cy="90" r="65" fill="url(#jasmine-glow)"/>
            <!-- Jasmine flowers -->
            <!-- Center flower -->
            ${[0,72,144,216,288].map(angle => {
                const rad = angle * Math.PI / 180;
                const x = 100 + 20 * Math.cos(rad);
                const y = 90 + 20 * Math.sin(rad);
                return `<ellipse cx="${x}" cy="${y}" rx="8" ry="12" fill="#f5f1e8" transform="rotate(${angle} ${x} ${y})"/>`;
            }).join('')}
            <circle cx="100" cy="90" r="6" fill="#d4af6a"/>
            <!-- Side flower -->
            ${[0,72,144,216,288].map(angle => {
                const rad = angle * Math.PI / 180;
                const x = 70 + 15 * Math.cos(rad);
                const y = 75 + 15 * Math.sin(rad);
                return `<ellipse cx="${x}" cy="${y}" rx="6" ry="9" fill="#f5f1e8" transform="rotate(${angle} ${x} ${y})"/>`;
            }).join('')}
            <circle cx="70" cy="75" r="4" fill="#d4af6a"/>
            <!-- Vine -->
            <path d="M100,110 Q95,125 90,140 Q85,155 80,170" stroke="#6b7c5d" stroke-width="3" fill="none"/>
            <!-- Leaves -->
            <ellipse cx="92" cy="130" rx="8" ry="12" fill="#8b9d83" transform="rotate(-20 92 130)"/>
            <ellipse cx="85" cy="150" rx="8" ry="12" fill="#8b9d83" transform="rotate(20 85 150)"/>
            <!-- Moon crescent -->
            <circle cx="130" cy="50" r="15" fill="#f4d4ba" opacity="0.6"/>
            <circle cx="135" cy="48" r="13" fill="#c5b8d4" opacity="0.3"/>
            <!-- Stars -->
            <circle cx="120" cy="35" r="2" fill="#d4af6a"/>
            <circle cx="145" cy="60" r="1.5" fill="#d4af6a"/>
            <circle cx="110" cy="55" r="1.5" fill="#f5f1e8"/>
        </svg>`;
    }
    
    // Fauna illustrations  
    static hare() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="hare-glow" cx="50%" cy="50%">
                    <stop offset="0%" style="stop-color:#f5f1e8;stop-opacity:0.6" />
                    <stop offset="100%" style="stop-color:#c9a9a3;stop-opacity:0.2" />
                </radialGradient>
            </defs>
            <!-- Moon glow -->
            <circle cx="100" cy="100" r="75" fill="url(#hare-glow)"/>
            <!-- Hare body -->
            <ellipse cx="100" cy="125" rx="35" ry="45" fill="#c9a9a3"/>
            <!-- Hare head -->
            <ellipse cx="100" cy="85" rx="28" ry="32" fill="#c9a9a3"/>
            <!-- Long ears -->
            <ellipse cx="85" cy="50" rx="7" ry="28" fill="#c9a9a3" transform="rotate(-10 85 50)"/>
            <ellipse cx="115" cy="50" rx="7" ry="28" fill="#c9a9a3" transform="rotate(10 115 50)"/>
            <ellipse cx="85" cy="55" rx="4" ry="20" fill="#f5f1e8" opacity="0.6" transform="rotate(-10 85 55)"/>
            <ellipse cx="115" cy="55" rx="4" ry="20" fill="#f5f1e8" opacity="0.6" transform="rotate(10 115 55)"/>
            <!-- Eyes -->
            <circle cx="92" cy="80" r="3" fill="#6b7c5d"/>
            <circle cx="108" cy="80" r="3" fill="#6b7c5d"/>
            <!-- Nose -->
            <circle cx="100" cy="90" r="2" fill="#d4a574"/>
            <!-- Whiskers -->
            <line x1="75" y1="88" x2="90" y2="87" stroke="#6b7c5d" stroke-width="1"/>
            <line x1="75" y1="92" x2="90" y2="91" stroke="#6b7c5d" stroke-width="1"/>
            <line x1="110" y1="87" x2="125" y2="88" stroke="#6b7c5d" stroke-width="1"/>
            <line x1="110" y1="91" x2="125" y2="92" stroke="#6b7c5d" stroke-width="1"/>
            <!-- Fluffy tail -->
            <circle cx="125" cy="135" r="18" fill="#f5f1e8" opacity="0.9"/>
            <!-- Moon symbols -->
            <circle cx="70" cy="60" r="2" fill="#d4af6a"/>
            <circle cx="130" cy="65" r="2" fill="#d4af6a"/>
            <path d="M100,30 L102,35 L107,35 L103,38 L105,43 L100,40 L95,43 L97,38 L93,35 L98,35 Z"
                  fill="#d4af6a" opacity="0.6"/>
        </svg>`;
    }
    
    static robin() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="robin-glow" cx="50%" cy="50%">
                    <stop offset="0%" style="stop-color:#d4a574;stop-opacity:0.5" />
                    <stop offset="100%" style="stop-color:#8b9d83;stop-opacity:0.2" />
                </radialGradient>
            </defs>
            <!-- Spring aura -->
            <circle cx="100" cy="100" r="70" fill="url(#robin-glow)"/>
            <!-- Robin body -->
            <ellipse cx="100" cy="105" rx="32" ry="38" fill="#8b9d83"/>
            <!-- Red breast -->
            <ellipse cx="100" cy="95" rx="24" ry="26" fill="#d4a574"/>
            <!-- Head -->
            <circle cx="100" cy="75" r="18" fill="#6b7c5d"/>
            <!-- Eye -->
            <circle cx="105" cy="72" r="3" fill="#f5f1e8"/>
            <circle cx="106" cy="71" r="1.5" fill="#6b7c5d"/>
            <!-- Beak -->
            <path d="M112,75 L120,75 L112,77 Z" fill="#d4af6a"/>
            <!-- Wings -->
            <ellipse cx="80" cy="105" rx="15" ry="25" fill="#6b7c5d" transform="rotate(-30 80 105)"/>
            <ellipse cx="120" cy="105" rx="15" ry="25" fill="#6b7c5d" transform="rotate(30 120 105)"/>
            <!-- Tail -->
            <path d="M100,135 L95,155 L100,150 L105,155 Z" fill="#6b7c5d"/>
            <!-- Feet -->
            <line x1="95" y1="140" x2="90" y2="148" stroke="#d4a574" stroke-width="2"/>
            <line x1="105" y1="140" x2="110" y2="148" stroke="#d4a574" stroke-width="2"/>
            <!-- Branch -->
            <line x1="70" y1="148" x2="130" y2="148" stroke="#8b9d83" stroke-width="3"/>
            <!-- Spring sparkles -->
            <circle cx="70" cy="70" r="2" fill="#b8d4c5"/>
            <circle cx="130" cy="75" r="2" fill="#b8d4c5"/>
            <circle cx="100" cy="50" r="1.5" fill="#d4af6a"/>
        </svg>`;
    }
    
    // Action illustrations
    static germination() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="100" cy="140" rx="50" ry="20" fill="#6b7c5d" opacity="0.3"/>
            <path d="M100,140 Q100,120 100,100" stroke="#8b9d83" stroke-width="4" fill="none"/>
            <ellipse cx="100" cy="100" rx="12" ry="15" fill="#d4af6a"/>
            <path d="M100,100 Q85,85 80,70" stroke="#8b9d83" stroke-width="3" fill="none"/>
            <path d="M100,100 Q115,85 120,70" stroke="#8b9d83" stroke-width="3" fill="none"/>
            <ellipse cx="80" cy="65" rx="10" ry="15" fill="#b8d4c5"/>
            <ellipse cx="120" cy="65" rx="10" ry="15" fill="#b8d4c5"/>
        </svg>`;
    }
    
    static seedBlessing() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="70" fill="#d4af6a" opacity="0.2"/>
            <path d="M70,100 Q100,70 130,100 Q100,130 70,100" fill="#f4d4ba" opacity="0.6"/>
            <ellipse cx="100" cy="100" rx="8" ry="12" fill="#6b7c5d"/>
            <path d="M100,88 L100,75 M95,80 L100,75 L105,80" stroke="#d4af6a" stroke-width="2" fill="none"/>
            <circle cx="85" cy="85" r="3" fill="#d4af6a" opacity="0.6"/>
            <circle cx="115" cy="85" r="3" fill="#d4af6a" opacity="0.6"/>
            <circle cx="85" cy="115" r="3" fill="#d4af6a" opacity="0.6"/>
            <circle cx="115" cy="115" r="3" fill="#d4af6a" opacity="0.6"/>
        </svg>`;
    }
    
    // Mystical illustrations
    static moonMilk() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="moon-glow" cx="50%" cy="30%">
                    <stop offset="0%" style="stop-color:#f4d4ba;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#c5b8d4;stop-opacity:0.2" />
                </radialGradient>
            </defs>
            <!-- Mystical moon glow -->
            <circle cx="100" cy="60" r="40" fill="url(#moon-glow)"/>
            <!-- Crescent moon -->
            <circle cx="100" cy="60" r="28" fill="#f4d4ba"/>
            <circle cx="108" cy="58" r="24" fill="#c5b8d4" opacity="0.3"/>
            <!-- Moon face -->
            <circle cx="95" cy="55" r="2" fill="#8b9d83"/>
            <circle cx="105" cy="55" r="2" fill="#8b9d83"/>
            <path d="M95,65 Q100,68 105,65" stroke="#8b9d83" stroke-width="1.5" fill="none"/>
            <!-- Chalice/cup below -->
            <path d="M75,110 L75,135 Q75,145 85,145 L115,145 Q125,145 125,135 L125,110 Z"
                  fill="#f5f1e8" stroke="#c9a9a3" stroke-width="2"/>
            <ellipse cx="100" cy="110" rx="25" ry="8" fill="#f5f1e8"/>
            <!-- Milk with moon reflection -->
            <ellipse cx="100" cy="120" rx="20" ry="6" fill="#f4d4ba" opacity="0.6"/>
            <!-- Mystical drops falling from moon -->
            <circle cx="90" cy="85" r="2" fill="#f4d4ba" opacity="0.7"/>
            <circle cx="100" cy="90" r="2" fill="#f4d4ba" opacity="0.7"/>
            <circle cx="110" cy="85" r="2" fill="#f4d4ba" opacity="0.7"/>
            <!-- Stars -->
            <circle cx="65" cy="50" r="2" fill="#d4af6a"/>
            <circle cx="135" cy="55" r="2" fill="#d4af6a"/>
            <circle cx="80" cy="35" r="1.5" fill="#d4af6a"/>
            <circle cx="120" cy="40" r="1.5" fill="#d4af6a"/>
        </svg>`;
    }
    
    static floromancy() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="60" fill="#c5b8d4" opacity="0.2"/>
            <path d="M100,70 L110,90 L130,90 L115,105 L120,125 L100,110 L80,125 L85,105 L70,90 L90,90 Z" 
                  fill="#c5b8d4" opacity="0.6"/>
            <circle cx="100" cy="100" r="15" fill="#d4af6a"/>
            <text x="100" y="105" font-size="12" text-anchor="middle" fill="#6b7c5d">✦</text>
        </svg>`;
    }
    
    // Default fallback
    static defaultIllustration() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="60" fill="#8b9d83" opacity="0.3"/>
            <path d="M100,60 Q80,80 80,100 Q80,120 100,140 Q120,120 120,100 Q120,80 100,60" 
                  fill="#b8d4c5" stroke="#6b7c5d" stroke-width="2"/>
            <circle cx="100" cy="100" r="10" fill="#d4af6a"/>
        </svg>`;
    }
    
    // Additional simple illustrations for remaining cards
    static aries() { return this.createZodiacSymbol('♈'); }
    static astrologicalNewYear() { return this.createCelestialCircle(); }
    static peachMoonstone() { return this.createCrystal('#f4d4ba'); }
    static ancestralLands() { return this.createTree(); }
    static creatingAltars() { return this.createAltar(); }
    static eostre() { return this.createGoddess(); }
    static sacredCircle() { return this.createMandala(); }
    static communityGarden() { return this.createGardenBeds(); }
    static composting() { return this.createCompostPile(); }
    static eggshellPots() { return this.createEggshells(); }
    static gardenParty() { return this.createGarland(); }
    static springCleaning() { return this.createBroom(); }
    static terrarium() { return this.createGlassJar(); }
    static wreathMaking() { return this.createWreath(); }
    static irishMoss() { return this.createMoss(); }
    static mushrooms() { return this.createMushroom(); }
    static primrose() { return this.createSimpleFlower('#f4d4ba'); }
    static chicks() { return this.createChick(); }
    static grasshopper() { return this.createInsect(); }
    static lamb() { return this.createLamb(); }
    static aromatherapy() { return this.createHerbBundle(); }
    static flowerWand() { return this.createWand(); }
    static hotCrossBuns() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="bun-glow" cx="50%" cy="50%">
                    <stop offset="0%" style="stop-color:#f4d4ba;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#d4a574;stop-opacity:0.3" />
                </radialGradient>
            </defs>
            <!-- Mystical glow -->
            <circle cx="100" cy="100" r="70" fill="url(#bun-glow)" opacity="0.4"/>
            <!-- Hot cross bun -->
            <ellipse cx="100" cy="105" rx="45" ry="40" fill="#d4a574"/>
            <ellipse cx="100" cy="95" rx="45" ry="35" fill="#c9a9a3"/>
            <!-- Cross on top -->
            <line x1="100" y1="75" x2="100" y2="115" stroke="#f5f1e8" stroke-width="6" stroke-linecap="round"/>
            <line x1="75" y1="95" x2="125" y2="95" stroke="#f5f1e8" stroke-width="6" stroke-linecap="round"/>
            <!-- Sparkles -->
            <circle cx="70" cy="70" r="2" fill="#d4af6a" opacity="0.8"/>
            <circle cx="130" cy="75" r="2" fill="#d4af6a" opacity="0.8"/>
            <circle cx="85" cy="130" r="2" fill="#d4af6a" opacity="0.8"/>
            <circle cx="115" cy="125" r="2" fill="#d4af6a" opacity="0.8"/>
        </svg>`;
    }
    static plantDyeing() { return this.createDyePot(); }
    static shortbread() { return this.createCookie(); }
    static simmerPot() { return this.createPot(); }
    static teaParty() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="tea-glow" cx="50%" cy="50%">
                    <stop offset="0%" style="stop-color:#b8d4c5;stop-opacity:0.6" />
                    <stop offset="100%" style="stop-color:#8b9d83;stop-opacity:0.2" />
                </radialGradient>
            </defs>
            <!-- Mystical aura -->
            <circle cx="100" cy="100" r="75" fill="url(#tea-glow)"/>
            <!-- Teacup -->
            <path d="M65,100 L65,120 Q65,130 75,130 L125,130 Q135,130 135,120 L135,100 Z"
                  fill="#f5f1e8" stroke="#8b9d83" stroke-width="2"/>
            <ellipse cx="100" cy="100" rx="35" ry="8" fill="#b8d4c5" opacity="0.7"/>
            <!-- Handle -->
            <path d="M135,105 Q150,105 150,115 Q150,125 135,125"
                  fill="none" stroke="#8b9d83" stroke-width="3"/>
            <!-- Steam with mystical swirls -->
            <path d="M85,95 Q80,85 85,75 Q90,65 85,55"
                  stroke="#d4af6a" stroke-width="2" fill="none" opacity="0.6"/>
            <path d="M100,95 Q95,80 100,65 Q105,50 100,40"
                  stroke="#d4af6a" stroke-width="2" fill="none" opacity="0.6"/>
            <path d="M115,95 Q120,85 115,75 Q110,65 115,55"
                  stroke="#d4af6a" stroke-width="2" fill="none" opacity="0.6"/>
            <!-- Sparkles -->
            <circle cx="60" cy="60" r="2" fill="#d4af6a"/>
            <circle cx="140" cy="65" r="2" fill="#d4af6a"/>
            <circle cx="75" cy="140" r="2" fill="#d4af6a"/>
        </svg>`;
    }
    static easterEggHunt() { return this.createEgg(); }
    static ostercierbaum() { return this.createEggTree(); }
    static paintedEggs() { return this.createPaintedEgg(); }
    static rainbow() { return this.createRainbow(); }
    static springHike() { return this.createPath(); }
    static springRain() { return this.createRaindrops(); }
    
    // Helper methods for simple patterns
    static createZodiacSymbol(symbol) {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="60" fill="#d4af6a" opacity="0.2"/>
            <text x="100" y="120" font-size="60" text-anchor="middle" fill="#6b7c5d">${symbol}</text>
        </svg>`;
    }
    
    static createCelestialCircle() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="50" fill="none" stroke="#d4af6a" stroke-width="3"/>
            <circle cx="100" cy="100" r="35" fill="none" stroke="#8b9d83" stroke-width="2"/>
            <circle cx="100" cy="100" r="20" fill="none" stroke="#6b7c5d" stroke-width="2"/>
            ${[0,45,90,135,180,225,270,315].map(angle => {
                const rad = angle * Math.PI / 180;
                const x = 100 + 55 * Math.cos(rad);
                const y = 100 + 55 * Math.sin(rad);
                return `<circle cx="${x}" cy="${y}" r="3" fill="#d4af6a"/>`;
            }).join('')}
        </svg>`;
    }
    
    static createTree() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <rect x="90" y="120" width="20" height="50" fill="#6b7c5d"/>
            <circle cx="100" cy="100" r="40" fill="#8b9d83" opacity="0.6"/>
            <circle cx="85" cy="85" r="30" fill="#8b9d83" opacity="0.6"/>
            <circle cx="115" cy="85" r="30" fill="#8b9d83" opacity="0.6"/>
        </svg>`;
    }
    
    static createSimpleFlower(color) {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            ${[0,72,144,216,288].map(angle => {
                const rad = angle * Math.PI / 180;
                const x = 100 + 25 * Math.cos(rad);
                const y = 100 + 25 * Math.sin(rad);
                return `<circle cx="${x}" cy="${y}" r="15" fill="${color}" opacity="0.8"/>`;
            }).join('')}
            <circle cx="100" cy="100" r="12" fill="#d4af6a"/>
        </svg>`;
    }
    
    static createRainbow() {
        const colors = ['#c9a9a3', '#f4d4ba', '#d4af6a', '#b8d4c5', '#8b9d83', '#c5b8d4'];
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            ${colors.map((color, i) => 
                `<path d="M ${50 + i*10},150 Q 100,${50 + i*10} ${150 - i*10},150" 
                       stroke="${color}" stroke-width="8" fill="none" opacity="0.7"/>`
            ).join('')}
        </svg>`;
    }
    
    static createRaindrops() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            ${[70,100,130,85,115].map((x, i) => 
                `<path d="M ${x},${60 + i*15} Q ${x},${80 + i*15} ${x},${90 + i*15} Q ${x-5},${85 + i*15} ${x-5},${80 + i*15} Q ${x-5},${70 + i*15} ${x},${60 + i*15}" 
                       fill="#b8d4c5" opacity="0.6"/>`
            ).join('')}
        </svg>`;
    }
    
    // Placeholder methods for remaining cards
    static createCrystal(color) {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="crystal-glow" cx="50%" cy="50%">
                    <stop offset="0%" style="stop-color:${color};stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#c5b8d4;stop-opacity:0.2" />
                </radialGradient>
            </defs>
            <!-- Crystal energy -->
            <circle cx="100" cy="100" r="70" fill="url(#crystal-glow)"/>
            <!-- Crystal facets -->
            <path d="M100,50 L120,80 L110,120 L100,110 L90,120 L80,80 Z"
                  fill="${color}" opacity="0.7" stroke="#d4af6a" stroke-width="2"/>
            <path d="M100,50 L100,110" stroke="#f5f1e8" stroke-width="2" opacity="0.5"/>
            <path d="M80,80 L120,80" stroke="#f5f1e8" stroke-width="2" opacity="0.5"/>
            <path d="M90,120 L110,120" stroke="#f5f1e8" stroke-width="2" opacity="0.5"/>
            <!-- Light rays -->
            <line x1="100" y1="50" x2="100" y2="35" stroke="#d4af6a" stroke-width="2" opacity="0.6"/>
            <line x1="85" y1="60" x2="75" y2="50" stroke="#d4af6a" stroke-width="2" opacity="0.6"/>
            <line x1="115" y1="60" x2="125" y2="50" stroke="#d4af6a" stroke-width="2" opacity="0.6"/>
            <!-- Sparkles -->
            <circle cx="70" cy="70" r="2" fill="#f5f1e8"/>
            <circle cx="130" cy="75" r="2" fill="#f5f1e8"/>
            <circle cx="100" cy="30" r="2" fill="#d4af6a"/>
        </svg>`;
    }
    static createAltar() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="altar-glow" cx="50%" cy="50%">
                    <stop offset="0%" style="stop-color:#d4af6a;stop-opacity:0.6" />
                    <stop offset="100%" style="stop-color:#c5b8d4;stop-opacity:0.2" />
                </radialGradient>
            </defs>
            <!-- Sacred space -->
            <circle cx="100" cy="100" r="75" fill="url(#altar-glow)"/>
            <!-- Altar table -->
            <rect x="60" y="120" width="80" height="15" fill="#8b9d83"/>
            <rect x="55" y="135" width="90" height="8" fill="#6b7c5d"/>
            <!-- Candles -->
            <rect x="75" y="100" width="8" height="20" rx="1" fill="#f5f1e8"/>
            <ellipse cx="79" cy="98" rx="5" ry="3" fill="#d4af6a"/>
            <path d="M79,95 Q77,85 79,75" stroke="#d4af6a" stroke-width="2" fill="none" opacity="0.6"/>
            <rect x="117" y="100" width="8" height="20" rx="1" fill="#f5f1e8"/>
            <ellipse cx="121" cy="98" rx="5" ry="3" fill="#d4af6a"/>
            <path d="M121,95 Q119,85 121,75" stroke="#d4af6a" stroke-width="2" fill="none" opacity="0.6"/>
            <!-- Crystal/offering in center -->
            <circle cx="100" cy="110" r="8" fill="#c5b8d4" opacity="0.7"/>
            <!-- Sacred symbols -->
            <circle cx="100" cy="60" r="20" fill="none" stroke="#d4af6a" stroke-width="2" opacity="0.5"/>
            <circle cx="100" cy="60" r="15" fill="none" stroke="#d4af6a" stroke-width="1.5" opacity="0.5"/>
            <!-- Sparkles -->
            <circle cx="70" cy="50" r="2" fill="#d4af6a"/>
            <circle cx="130" cy="55" r="2" fill="#d4af6a"/>
        </svg>`;
    }
    static createGoddess() { return this.createCelestialCircle(); }
    static createMandala() { return this.createCelestialCircle(); }
    static createGardenBeds() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="garden-glow" cx="50%" cy="50%">
                    <stop offset="0%" style="stop-color:#8b9d83;stop-opacity:0.5" />
                    <stop offset="100%" style="stop-color:#b8d4c5;stop-opacity:0.2" />
                </radialGradient>
            </defs>
            <!-- Community energy -->
            <circle cx="100" cy="100" r="75" fill="url(#garden-glow)"/>
            <!-- Garden beds -->
            <rect x="50" y="80" width="40" height="30" rx="3" fill="#6b7c5d" opacity="0.6"/>
            <rect x="110" y="80" width="40" height="30" rx="3" fill="#6b7c5d" opacity="0.6"/>
            <rect x="50" y="120" width="40" height="30" rx="3" fill="#6b7c5d" opacity="0.6"/>
            <rect x="110" y="120" width="40" height="30" rx="3" fill="#6b7c5d" opacity="0.6"/>
            <!-- Plants growing -->
            <ellipse cx="70" cy="90" rx="3" ry="8" fill="#8b9d83"/>
            <ellipse cx="80" cy="92" rx="3" ry="8" fill="#b8d4c5"/>
            <ellipse cx="130" cy="88" rx="3" ry="8" fill="#8b9d83"/>
            <ellipse cx="140" cy="90" rx="3" ry:="8" fill="#b8d4c5"/>
            <ellipse cx="65" cy="130" rx="3" ry="8" fill="#d4af6a"/>
            <ellipse cx="75" cy="132" rx="3" ry="8" fill="#8b9d83"/>
            <ellipse cx="125" cy="128" rx="3" ry="8" fill="#d4af6a"/>
            <ellipse cx="135" cy="130" rx="3" ry="8" fill="#b8d4c5"/>
            <!-- Paths between beds -->
            <rect x="95" y="80" width="10" height="70" fill="#d4a574" opacity="0.4"/>
            <rect x="50" y="115" width="100" height="5" fill="#d4a574" opacity="0.4"/>
            <!-- Sparkles -->
            <circle cx="60" cy="65" r="2" fill="#b8d4c5"/>
            <circle cx="140" cy="70" r="2" fill="#d4af6a"/>
        </svg>`;
    }
    static createCompostPile() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="compost-glow" cx="50%" cy="50%">
                    <stop offset="0%" style="stop-color:#8b9d83;stop-opacity:0.6" />
                    <stop offset="100%" style="stop-color:#6b7c5d;stop-opacity:0.2" />
                </radialGradient>
            </defs>
            <!-- Transformation energy -->
            <circle cx="100" cy="120" r="70" fill="url(#compost-glow)"/>
            <!-- Compost pile -->
            <ellipse cx="100" cy="140" rx="60" ry="25" fill="#6b7c5d"/>
            <ellipse cx="100" cy="125" rx="55" ry="22" fill="#8b9d83"/>
            <ellipse cx="100" cy="110" rx="45" ry="18" fill="#6b7c5d" opacity="0.8"/>
            <!-- Organic matter -->
            <ellipse cx="80" cy="120" rx="8" ry="4" fill="#d4a574" opacity="0.6" transform="rotate(-20 80 120)"/>
            <ellipse cx="120" cy="125" rx="8" ry="4" fill="#c9a9a3" opacity="0.6" transform="rotate(15 120 125)"/>
            <ellipse cx="95" cy="135" rx="6" ry="3" fill="#8b9d83" opacity="0.7"/>
            <!-- Steam/decomposition -->
            <path d="M85,105 Q80,95 85,85" stroke="#8b9d83" stroke-width="2" fill="none" opacity="0.4"/>
            <path d="M100,100 Q95,90 100,80" stroke="#8b9d83" stroke-width="2" fill="none" opacity="0.4"/>
            <path d="M115,105 Q120,95 115,85" stroke="#8b9d83" stroke-width="2" fill="none" opacity="0.4"/>
            <!-- Worms/life -->
            <path d="M70,130 Q75,128 80,130" stroke="#d4a574" stroke-width="2" fill="none" opacity="0.5"/>
            <!-- Sparkles of transformation -->
            <circle cx="75" cy="90" r="2" fill="#b8d4c5" opacity="0.6"/>
            <circle cx="125" cy="95" r="2" fill="#b8d4c5" opacity="0.6"/>
        </svg>`;
    }
    static createEggshells() { return this.createEgg(); }
    static createGarland() { return this.createWreath(); }
    static createBroom() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="broom-glow" cx="50%" cy="50%">
                    <stop offset="0%" style="stop-color:#d4a574;stop-opacity:0.4" />
                    <stop offset="100%" style="stop-color:#8b9d83;stop-opacity:0.2" />
                </radialGradient>
            </defs>
            <!-- Clearing energy -->
            <circle cx="100" cy="100" r="70" fill="url(#broom-glow)"/>
            <!-- Broom handle -->
            <rect x="95" y="40" width="10" height="100" rx="2" fill="#8b9d83"/>
            <!-- Broom bristles -->
            <path d="M80,140 L80,160" stroke="#d4a574" stroke-width="3"/>
            <path d="M85,140 L83,165" stroke="#d4a574" stroke-width="3"/>
            <path d="M90,140 L87,168" stroke="#d4a574" stroke-width="3"/>
            <path d="M95,140 L92,170" stroke="#d4a574" stroke-width="3"/>
            <path d="M100,140 L100,170" stroke="#d4a574" stroke-width="3"/>
            <path d="M105,140 L108,170" stroke="#d4a574" stroke-width="3"/>
            <path d="M110,140 L113,168" stroke="#d4a574" stroke-width="3"/>
            <path d="M115,140 L117,165" stroke="#d4a574" stroke-width="3"/>
            <path d="M120,140 L120,160" stroke="#d4a574" stroke-width="3"/>
            <!-- Binding -->
            <ellipse cx="100" cy="140" rx="20" ry="4" fill="#6b7c5d"/>
            <ellipse cx="100" cy="145" rx="20" ry="4" fill="#6b7c5d"/>
            <!-- Dust/clearing sparkles -->
            <circle cx="70" cy="150" r="2" fill="#d4a574" opacity="0.5"/>
            <circle cx="130" cy="155" r="2" fill="#d4a574" opacity="0.5"/>
            <circle cx="85" cy="165" r="1.5" fill="#d4a574" opacity="0.4"/>
            <circle cx="115" cy="168" r="1.5" fill="#d4a574" opacity="0.4"/>
        </svg>`;
    }
    static createGlassJar() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="jar-glow" cx="50%" cy="50%">
                    <stop offset="0%" style="stop-color:#b8d4c5;stop-opacity:0.5" />
                    <stop offset="100%" style="stop-color:#f5f1e8;stop-opacity:0.2" />
                </radialGradient>
            </defs>
            <!-- Contained magic -->
            <circle cx="100" cy="110" r="65" fill="url(#jar-glow)"/>
            <!-- Glass jar -->
            <path d="M70,90 L70,145 Q70,155 80,155 L120,155 Q130,155 130,145 L130,90 Z"
                  fill="#f5f1e8" stroke="#b8d4c5" stroke-width="2" opacity="0.7"/>
            <!-- Jar opening -->
            <ellipse cx="100" cy="90" rx="30" ry="8" fill="#f5f1e8" stroke="#b8d4c5" stroke-width="2" opacity="0.7"/>
            <!-- Lid -->
            <rect x="85" y="80" width="30" height="10" rx="2" fill="#8b9d83"/>
            <ellipse cx="100" cy="80" rx="15" ry="5" fill="#6b7c5d"/>
            <!-- Plants/terrarium inside -->
            <ellipse cx="85" cy="130" rx="5" ry="12" fill="#8b9d83" opacity="0.6"/>
            <ellipse cx="100" cy="125" rx="5" ry="15" fill="#b8d4c5" opacity="0.6"/>
            <ellipse cx="115" cy="130" rx="5" ry="12" fill="#8b9d83" opacity="0.6"/>
            <!-- Soil -->
            <ellipse cx="100" cy="145" rx="25" ry="8" fill="#6b7c5d" opacity="0.5"/>
            <!-- Glass shine -->
            <ellipse cx="80" cy="110" rx="8" ry="20" fill="#f5f1e8" opacity="0.3"/>
            <!-- Sparkles -->
            <circle cx="75" cy="100" r="2" fill="#b8d4c5" opacity="0.6"/>
            <circle cx="125" cy="105" r="2" fill="#b8d4c5" opacity="0.6"/>
        </svg>`;
    }
    static createWreath() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="wreath-glow" cx="50%" cy="50%">
                    <stop offset="0%" style="stop-color:#8b9d83;stop-opacity:0.5" />
                    <stop offset="100%" style="stop-color:#d4af6a;stop-opacity:0.2" />
                </radialGradient>
            </defs>
            <!-- Celebration energy -->
            <circle cx="100" cy="100" r="75" fill="url(#wreath-glow)"/>
            <!-- Wreath circle base -->
            <circle cx="100" cy="100" r="50" fill="none" stroke="#8b9d83" stroke-width="15"/>
            <circle cx="100" cy="100" r="50" fill="none" stroke="#6b7c5d" stroke-width="8" opacity="0.5"/>
            <!-- Berries and decorations -->
            ${[0,45,90,135,180,225,270,315].map(angle => {
                const rad = angle * Math.PI / 180;
                const x = 100 + 50 * Math.cos(rad);
                const y = 100 + 50 * Math.sin(rad);
                return `<circle cx="${x}" cy="${y}" r="6" fill="#d4a574"/>`;
            }).join('')}
            <!-- Flowers -->
            ${[30,75,120,165,210,255,300,345].map(angle => {
                const rad = angle * Math.PI / 180;
                const x = 100 + 50 * Math.cos(rad);
                const y = 100 + 50 * Math.sin(rad);
                return `<circle cx="${x}" cy="${y}" r="5" fill="#f4d4ba"/>`;
            }).join('')}
            <!-- Ribbon bow at top -->
            <ellipse cx="95" cy="45" rx="8" ry="12" fill="#c5b8d4" transform="rotate(-30 95 45)"/>
            <ellipse cx="105" cy="45" rx="8" ry="12" fill="#c5b8d4" transform="rotate(30 105 45)"/>
            <circle cx="100" cy="48" r="5" fill="#c5b8d4"/>
            <!-- Sparkles -->
            <circle cx="75" cy="60" r="2" fill="#d4af6a"/>
            <circle cx="125" cy="65" r="2" fill="#d4af6a"/>
        </svg>`;
    }
    static createMoss() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="moss-glow" cx="50%" cy="50%">
                    <stop offset="0%" style="stop-color:#b8d4c5;stop-opacity:0.6" />
                    <stop offset="100%" style="stop-color:#8b9d83;stop-opacity:0.2" />
                </radialGradient>
            </defs>
            <!-- Ground cover energy -->
            <circle cx="100" cy="130" r="70" fill="url(#moss-glow)"/>
            <!-- Moss patches -->
            <ellipse cx="80" cy="130" rx="35" ry="20" fill="#8b9d83" opacity="0.7"/>
            <ellipse cx="120" cy="135" rx="30" ry="18" fill="#b8d4c5" opacity="0.7"/>
            <ellipse cx="100" cy="145" rx="40" ry="15" fill="#8b9d83" opacity="0.6"/>
            <!-- Texture details -->
            <circle cx="70" cy="125" r="8" fill="#8b9d83" opacity="0.5"/>
            <circle cx="90" cy="130" r="10" fill="#b8d4c5" opacity="0.5"/>
            <circle cx="110" cy="135" r="9" fill="#8b9d83" opacity="0.5"/>
            <circle cx="130" cy="132" r="7" fill="#b8d4c5" opacity="0.5"/>
            <circle cx="85" cy="142" r="6" fill="#8b9d83" opacity="0.4"/>
            <circle cx="115" cy="145" r="8" fill="#b8d4c5" opacity="0.4"/>
            <!-- Tiny moss details -->
            <circle cx="75" cy="135" r="3" fill="#6b7c5d" opacity="0.6"/>
            <circle cx="95" cy="140" r="3" fill="#6b7c5d" opacity="0.6"/>
            <circle cx="105" cy="142" r="3" fill="#6b7c5d" opacity="0.6"/>
            <circle cx="125" cy="138" r="3" fill="#6b7c5d" opacity="0.6"/>
            <!-- Dew drops -->
            <circle cx="80" cy="120" r="2" fill="#f5f1e8" opacity="0.7"/>
            <circle cx="120" cy="128" r="2" fill="#f5f1e8" opacity="0.7"/>
            <circle cx="100" cy="138" r="2" fill="#f5f1e8" opacity="0.7"/>
        </svg>`;
    }
    static createMushroom() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="mushroom-glow" cx="50%" cy="50%">
                    <stop offset="0%" style="stop-color:#c9a9a3;stop-opacity:0.5" />
                    <stop offset="100%" style="stop-color:#8b9d83;stop-opacity:0.2" />
                </radialGradient>
            </defs>
            <!-- Mycelium network glow -->
            <circle cx="100" cy="120" r="70" fill="url(#mushroom-glow)"/>
            <!-- Large mushroom -->
            <ellipse cx="100" cy="95" rx="45" ry="28" fill="#c9a9a3"/>
            <ellipse cx="100" cy="95" rx="40" ry="25" fill="#d4a574"/>
            <rect x="85" y="95" width="30" height="55" rx="5" fill="#f5f1e8"/>
            <!-- Spots on cap -->
            <circle cx="80" cy="85" r="6" fill="#f5f1e8" opacity="0.7"/>
            <circle cx="100" cy="80" r="5" fill="#f5f1e8" opacity="0.7"/>
            <circle cx="115" cy="88" r="7" fill="#f5f1e8" opacity="0.7"/>
            <circle cx="95" cy="95" r="4" fill="#f5f1e8" opacity="0.7"/>
            <!-- Small mushroom -->
            <ellipse cx="65" cy="130" rx="20" ry="12" fill="#c9a9a3"/>
            <rect x="58" y="130" width="14" height="25" rx="3" fill="#f5f1e8"/>
            <circle cx="60" cy="125" r="3" fill="#f5f1e8" opacity="0.7"/>
            <circle cx="70" cy="127" r="2.5" fill="#f5f1e8" opacity="0.7"/>
            <!-- Mycelium threads -->
            <path d="M85,150 Q80,155 75,160" stroke="#8b9d83" stroke-width="1.5" opacity="0.5"/>
            <path d="M100,150 Q100,157 98,165" stroke="#8b9d83" stroke-width="1.5" opacity="0.5"/>
            <path d="M115,150 Q120,155 125,160" stroke="#8b9d83" stroke-width="1.5" opacity="0.5"/>
            <!-- Mystical spores -->
            <circle cx="70" cy="70" r="1.5" fill="#d4af6a" opacity="0.6"/>
            <circle cx="130" cy="75" r="1.5" fill="#d4af6a" opacity="0.6"/>
            <circle cx="90" cy="60" r="1" fill="#c9a9a3" opacity="0.5"/>
            <circle cx="110" cy="65" r="1" fill="#c9a9a3" opacity="0.5"/>
        </svg>`;
    }
    static createChick() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="chick-glow" cx="50%" cy="50%">
                    <stop offset="0%" style="stop-color:#f4d4ba;stop-opacity:0.6" />
                    <stop offset="100%" style="stop-color:#d4af6a;stop-opacity:0.2" />
                </radialGradient>
            </defs>
            <!-- Spring warmth -->
            <circle cx="100" cy="100" r="70" fill="url(#chick-glow)"/>
            <!-- Chick body -->
            <circle cx="100" cy="110" r="35" fill="#d4af6a"/>
            <!-- Chick head -->
            <circle cx="100" cy="75" r="25" fill="#d4af6a"/>
            <!-- Eyes -->
            <circle cx="92" cy="72" r="3" fill="#6b7c5d"/>
            <circle cx="108" cy="72" r="3" fill="#6b7c5d"/>
            <!-- Beak -->
            <path d="M100,80 L105,82 L100,84 Z" fill="#d4a574"/>
            <!-- Wings -->
            <ellipse cx="75" cy="110" rx="12" ry="20" fill="#f4d4ba" opacity="0.8"/>
            <ellipse cx="125" cy="110" rx="12" ry="20" fill="#f4d4ba" opacity="0.8"/>
            <!-- Feet -->
            <path d="M95,140 L90,148 M95,140 L95,148 M95,140 L100,148" stroke="#d4a574" stroke-width="2"/>
            <path d="M105,140 L100,148 M105,140 L105,148 M105,140 L110,148" stroke="#d4a574" stroke-width="2"/>
            <!-- Eggshell pieces -->
            <path d="M70,145 Q75,140 80,145" stroke="#f5f1e8" stroke-width="3" fill="none"/>
            <path d="M120,145 Q125,140 130,145" stroke="#f5f1e8" stroke-width="3" fill="none"/>
            <!-- Sparkles -->
            <circle cx="70" cy="70" r="2" fill="#f4d4ba"/>
            <circle cx="130" cy="75" r="2" fill="#f4d4ba"/>
        </svg>`;
    }
    static createInsect() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="grasshopper-glow" cx="50%" cy="50%">
                    <stop offset="0%" style="stop-color:#b8d4c5;stop-opacity:0.5" />
                    <stop offset="100%" style="stop-color:#8b9d83;stop-opacity:0.2" />
                </radialGradient>
            </defs>
            <!-- Garden energy -->
            <circle cx="100" cy="100" r="70" fill="url(#grasshopper-glow)"/>
            <!-- Grasshopper body -->
            <ellipse cx="100" cy="100" rx="15" ry="35" fill="#8b9d83"/>
            <!-- Head -->
            <circle cx="100" cy="75" r="12" fill="#8b9d83"/>
            <!-- Eyes -->
            <circle cx="95" cy="72" r="3" fill="#6b7c5d"/>
            <circle cx="105" cy="72" r="3" fill="#6b7c5d"/>
            <!-- Antennae -->
            <path d="M95,65 Q90,55 88,45" stroke="#6b7c5d" stroke-width="2" fill="none"/>
            <path d="M105,65 Q110,55 112,45" stroke="#6b7c5d" stroke-width="2" fill="none"/>
            <!-- Wings -->
            <ellipse cx="95" cy="95" rx="20" ry="30" fill="#b8d4c5" opacity="0.6" transform="rotate(-20 95 95)"/>
            <ellipse cx="105" cy="95" rx="20" ry="30" fill="#b8d4c5" opacity="0.6" transform="rotate(20 105 95)"/>
            <!-- Legs -->
            <path d="M90,110 Q75,120 70,140" stroke="#8b9d83" stroke-width="3" fill="none"/>
            <path d="M95,115 Q85,130 82,145" stroke="#8b9d83" stroke-width="3" fill="none"/>
            <path d="M110,110 Q125,120 130,140" stroke="#8b9d83" stroke-width="3" fill="none"/>
            <path d="M105,115 Q115,130 118,145" stroke="#8b9d83" stroke-width="3" fill="none"/>
            <!-- Grass blade -->
            <path d="M100,150 Q95,130 90,110" stroke="#6b7c5d" stroke-width="2" fill="none"/>
            <!-- Sparkles -->
            <circle cx="75" cy="65" r="2" fill="#d4af6a"/>
            <circle cx="125" cy="70" r="2" fill="#d4af6a"/>
        </svg>`;
    }
    static createLamb() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="lamb-glow" cx="50%" cy="50%">
                    <stop offset="0%" style="stop-color:#f5f1e8;stop-opacity:0.7" />
                    <stop offset="100%" style="stop-color:#c9a9a3;stop-opacity:0.2" />
                </radialGradient>
            </defs>
            <!-- Gentle aura -->
            <circle cx="100" cy="100" r="75" fill="url(#lamb-glow)"/>
            <!-- Lamb body (fluffy) -->
            <ellipse cx="100" cy="115" rx="40" ry="35" fill="#f5f1e8"/>
            <circle cx="75" cy="110" r="15" fill="#f5f1e8"/>
            <circle cx="125" cy="110" r="15" fill="#f5f1e8"/>
            <circle cx="90" cy="130" r="12" fill="#f5f1e8"/>
            <circle cx="110" cy="130" r="12" fill="#f5f1e8"/>
            <!-- Lamb head -->
            <ellipse cx="100" cy="80" rx="22" ry="25" fill="#f5f1e8"/>
            <circle cx="85" cy="75" r="10" fill="#f5f1e8"/>
            <circle cx="115" cy="75" r="10" fill="#f5f1e8"/>
            <!-- Ears -->
            <ellipse cx="85" cy="65" rx="6" ry="12" fill="#c9a9a3" opacity="0.6"/>
            <ellipse cx="115" cy="65" rx="6" ry="12" fill="#c9a9a3" opacity="0.6"/>
            <!-- Face -->
            <circle cx="95" cy="78" r="2" fill="#6b7c5d"/>
            <circle cx="105" cy="78" r="2" fill="#6b7c5d"/>
            <circle cx="100" cy="85" r="2" fill="#c9a9a3"/>
            <!-- Legs -->
            <rect x="85" y="140" width="6" height="20" fill="#c9a9a3"/>
            <rect x="109" y="140" width="6" height="20" fill="#c9a9a3"/>
            <!-- Spring flowers around -->
            <circle cx="70" cy="150" r="4" fill="#d4af6a"/>
            <circle cx="130" cy="150" r="4" fill="#d4af6a"/>
            <!-- Sparkles -->
            <circle cx="75" cy="60" r="2" fill="#f4d4ba"/>
            <circle cx="125" cy="65" r="2" fill="#f4d4ba"/>
        </svg>`;
    }
    static createHerbBundle() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="herb-glow" cx="50%" cy="50%">
                    <stop offset="0%" style="stop-color:#b8d4c5;stop-opacity:0.6" />
                    <stop offset="100%" style="stop-color:#8b9d83;stop-opacity:0.2" />
                </radialGradient>
            </defs>
            <!-- Healing aura -->
            <circle cx="100" cy="100" r="70" fill="url(#herb-glow)"/>
            <!-- Bundle of herbs tied together -->
            <ellipse cx="95" cy="120" rx="4" ry="35" fill="#8b9d83" transform="rotate(-15 95 120)"/>
            <ellipse cx="100" cy="118" rx="4" ry="38" fill="#6b7c5d"/>
            <ellipse cx="105" cy="120" rx="4" ry="35" fill="#8b9d83" transform="rotate(15 105 120)"/>
            <!-- Herb leaves -->
            <ellipse cx="90" cy="90" rx="6" ry="3" fill="#b8d4c5" transform="rotate(-20 90 90)"/>
            <ellipse cx="95" cy="85" rx="6" ry="3" fill="#b8d4c5" transform="rotate(-10 95 85)"/>
            <ellipse cx="105" cy="85" rx="6" ry="3" fill="#b8d4c5" transform="rotate(10 105 85)"/>
            <ellipse cx="110" cy="90" rx="6" ry="3" fill="#b8d4c5" transform="rotate(20 110 90)"/>
            <!-- Twine binding -->
            <ellipse cx="100" cy="125" rx="8" ry="3" fill="#d4a574"/>
            <ellipse cx="100" cy="130" rx="8" ry="3" fill="#d4a574"/>
            <!-- Sparkles -->
            <circle cx="80" cy="80" r="2" fill="#d4af6a"/>
            <circle cx="120" cy="85" r="2" fill="#d4af6a"/>
            <circle cx="100" cy="70" r="1.5" fill="#b8d4c5"/>
        </svg>`;
    }
    static createWand() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="wand-glow" cx="50%" cy="30%">
                    <stop offset="0%" style="stop-color:#d4af6a;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#c5b8d4;stop-opacity:0.2" />
                </radialGradient>
            </defs>
            <!-- Magical aura -->
            <circle cx="100" cy="60" r="50" fill="url(#wand-glow)"/>
            <!-- Wand stick -->
            <rect x="97" y="70" width="6" height="90" rx="3" fill="#8b9d83"/>
            <!-- Crystal/star at top -->
            <path d="M100,40 L105,55 L120,55 L108,65 L113,80 L100,70 L87,80 L92,65 L80,55 L95,55 Z"
                  fill="#d4af6a" opacity="0.9"/>
            <circle cx="100" cy="60" r="8" fill="#f4d4ba"/>
            <!-- Flowers attached -->
            ${[0,120,240].map(angle => {
                const rad = (angle - 90) * Math.PI / 180;
                const x = 100 + 15 * Math.cos(rad);
                const y = 100 + 15 * Math.sin(rad);
                return `<circle cx="${x}" cy="${y}" r="5" fill="#c5b8d4" opacity="0.8"/>`;
            }).join('')}
            <!-- Magical sparkles -->
            <circle cx="75" cy="50" r="2" fill="#d4af6a"/>
            <circle cx="125" cy="55" r="2" fill="#d4af6a"/>
            <circle cx="90" cy="35" r="1.5" fill="#f4d4ba"/>
            <circle cx="110" cy="40" r="1.5" fill="#f4d4ba"/>
            <!-- Ribbons -->
            <path d="M100,105 Q85,110 80,120" stroke="#c5b8d4" stroke-width="2" fill="none" opacity="0.6"/>
            <path d="M100,105 Q115,110 120,120" stroke="#c5b8d4" stroke-width="2" fill="none" opacity="0.6"/>
        </svg>`;
    }
    static createBun() { return this.createSimpleFlower('#d4a574'); }
    static createDyePot() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="dye-glow" cx="50%" cy="50%">
                    <stop offset="0%" style="stop-color:#c5b8d4;stop-opacity:0.5" />
                    <stop offset="100%" style="stop-color:#d4a574;stop-opacity:0.2" />
                </radialGradient>
            </defs>
            <!-- Color magic aura -->
            <circle cx="100" cy="110" r="65" fill="url(#dye-glow)"/>
            <!-- Pot -->
            <path d="M65,95 L65,135 Q65,145 75,145 L125,145 Q135,145 135,135 L135,95 Z"
                  fill="#6b7c5d" stroke="#8b9d83" stroke-width="2"/>
            <ellipse cx="100" cy="95" rx="35" ry="10" fill="#8b9d83"/>
            <!-- Colorful dye liquid -->
            <ellipse cx="100" cy="110" rx="30" ry="8" fill="#c5b8d4" opacity="0.7"/>
            <ellipse cx="100" cy="120" rx="28" ry="7" fill="#d4a574" opacity="0.6"/>
            <!-- Plant material in pot -->
            <ellipse cx="90" cy="105" rx="4" ry="8" fill="#8b9d83" opacity="0.5"/>
            <ellipse cx="110" cy="108" rx="4" ry="8" fill="#8b9d83" opacity="0.5"/>
            <!-- Steam/vapor -->
            <path d="M85,90 Q80,80 85,70" stroke="#c5b8d4" stroke-width="2" fill="none" opacity="0.5"/>
            <path d="M100,90 Q95,75 100,60" stroke="#d4a574" stroke-width="2" fill="none" opacity="0.5"/>
            <path d="M115,90 Q120,80 115,70" stroke="#c5b8d4" stroke-width="2" fill="none" opacity="0.5"/>
            <!-- Color sparkles -->
            <circle cx="70" cy="70" r="2" fill="#c5b8d4"/>
            <circle cx="130" cy="75" r="2" fill="#d4a574"/>
            <circle cx="100" cy="55" r="1.5" fill="#c5b8d4"/>
        </svg>`;
    }
    static createCookie() { return this.createSimpleFlower('#d4a574'); }
    static createPot() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="pot-glow" cx="50%" cy="50%">
                    <stop offset="0%" style="stop-color:#d4a574;stop-opacity:0.4" />
                    <stop offset="100%" style="stop-color:#8b9d83;stop-opacity:0.2" />
                </radialGradient>
            </defs>
            <!-- Warmth aura -->
            <circle cx="100" cy="115" r="65" fill="url(#pot-glow)"/>
            <!-- Pot body -->
            <path d="M70,100 L70,140 Q70,150 80,150 L120,150 Q130,150 130,140 L130,100 Z"
                  fill="#c9a9a3" stroke="#6b7c5d" stroke-width="2"/>
            <ellipse cx="100" cy="100" rx="30" ry="10" fill="#d4a574"/>
            <!-- Contents -->
            <ellipse cx="100" cy="115" rx="25" ry="8" fill="#8b9d83" opacity="0.5"/>
            <!-- Handles -->
            <path d="M70,110 Q60,110 60,120 Q60,130 70,130"
                  fill="none" stroke="#6b7c5d" stroke-width="3"/>
            <path d="M130,110 Q140,110 140,120 Q140,130 130,130"
                  fill="none" stroke="#6b7c5d" stroke-width="3"/>
            <!-- Steam -->
            <path d="M90,95 Q85,85 90,75" stroke="#d4af6a" stroke-width="2" fill="none" opacity="0.5"/>
            <path d="M110,95 Q115,85 110,75" stroke="#d4af6a" stroke-width="2" fill="none" opacity="0.5"/>
        </svg>`;
    }
    static createTeacup() { return this.createPot(); }
    static createEgg() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="egg-glow" cx="50%" cy="50%">
                    <stop offset="0%" style="stop-color:#f5f1e8;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#d4af6a;stop-opacity:0.2" />
                </radialGradient>
            </defs>
            <!-- Spring fertility glow -->
            <circle cx="100" cy="110" r="70" fill="url(#egg-glow)"/>
            <!-- Egg -->
            <ellipse cx="100" cy="110" rx="38" ry="52" fill="#f5f1e8" stroke="#d4af6a" stroke-width="2"/>
            <!-- Decorative patterns -->
            <path d="M75,100 Q100,95 125,100" stroke="#d4af6a" stroke-width="2" fill="none"/>
            <path d="M75,120 Q100,115 125,120" stroke="#d4af6a" stroke-width="2" fill="none"/>
            <path d="M80,85 Q100,82 120,85" stroke="#c9a9a3" stroke-width="1.5" fill="none" opacity="0.6"/>
            <path d="M80,135 Q100,132 120,135" stroke="#c9a9a3" stroke-width="1.5" fill="none" opacity="0.6"/>
            <!-- Dots -->
            <circle cx="85" cy="110" r="3" fill="#d4af6a" opacity="0.5"/>
            <circle cx="115" cy="110" r="3" fill="#d4af6a" opacity="0.5"/>
            <circle cx="100" cy="95" r="2" fill="#c9a9a3" opacity="0.5"/>
            <circle cx="100" cy="125" r="2" fill="#c9a9a3" opacity="0.5"/>
            <!-- Sparkles -->
            <circle cx="70" cy="80" r="2" fill="#d4af6a"/>
            <circle cx="130" cy="85" r="2" fill="#d4af6a"/>
        </svg>`;
    }
    static createEggTree() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="eggtree-glow" cx="50%" cy="50%">
                    <stop offset="0%" style="stop-color:#d4af6a;stop-opacity:0.5" />
                    <stop offset="100%" style="stop-color:#8b9d83;stop-opacity:0.2" />
                </radialGradient>
            </defs>
            <!-- Spring celebration aura -->
            <circle cx="100" cy="100" r="75" fill="url(#eggtree-glow)"/>
            <!-- Tree branches -->
            <line x1="100" y1="160" x2="100" y2="80" stroke="#6b7c5d" stroke-width="4"/>
            <path d="M100,100 Q80,90 70,85" stroke="#6b7c5d" stroke-width="3" fill="none"/>
            <path d="M100,100 Q120,90 130,85" stroke="#6b7c5d" stroke-width="3" fill="none"/>
            <path d="M100,120 Q75,115 65,110" stroke="#6b7c5d" stroke-width="3" fill="none"/>
            <path d="M100,120 Q125,115 135,110" stroke="#6b7c5d" stroke-width="3" fill="none"/>
            <!-- Decorated eggs hanging -->
            <ellipse cx="70" cy="80" rx="8" ry="11" fill="#f4d4ba" stroke="#d4af6a" stroke-width="1"/>
            <line x1="70" y1="69" x2="70" y2="85" stroke="#c9a9a3" stroke-width="1"/>
            <ellipse cx="130" cy="80" rx="8" ry="11" fill="#c5b8d4" stroke="#d4af6a" stroke-width="1"/>
            <line x1="130" y1="69" x2="130" y2="85" stroke="#c9a9a3" stroke-width="1"/>
            <ellipse cx="65" cy="105" rx="7" ry="10" fill="#b8d4c5" stroke="#d4af6a" stroke-width="1"/>
            <line x1="65" y1="95" x2="65" y2="110" stroke="#c9a9a3" stroke-width="1"/>
            <ellipse cx="135" cy="105" rx="7" ry="10" fill="#f5f1e8" stroke="#d4af6a" stroke-width="1"/>
            <line x1="135" y1="95" x2="135" y2="110" stroke="#c9a9a3" stroke-width="1"/>
            <ellipse cx="100" cy="75" rx="9" ry="12" fill="#d4a574" stroke="#d4af6a" stroke-width="1"/>
            <line x1="100" y1="63" x2="100" y2="80" stroke="#c9a9a3" stroke-width="1"/>
            <!-- Sparkles -->
            <circle cx="85" cy="65" r="2" fill="#d4af6a"/>
            <circle cx="115" cy="70" r="2" fill="#d4af6a"/>
        </svg>`;
    }
    static createPaintedEgg() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="painted-glow" cx="50%" cy="50%">
                    <stop offset="0%" style="stop-color:#c5b8d4;stop-opacity:0.6" />
                    <stop offset="100%" style="stop-color:#d4af6a;stop-opacity:0.2" />
                </radialGradient>
            </defs>
            <!-- Creative energy -->
            <circle cx="100" cy="110" r="70" fill="url(#painted-glow)"/>
            <!-- Egg -->
            <ellipse cx="100" cy="110" rx="38" ry="52" fill="#f5f1e8" stroke="#d4af6a" stroke-width="2"/>
            <!-- Colorful painted designs -->
            <path d="M70,95 Q100,90 130,95" stroke="#c5b8d4" stroke-width="3" fill="none"/>
            <path d="M70,110 Q100,105 130,110" stroke="#d4a574" stroke-width="3" fill="none"/>
            <path d="M70,125 Q100,120 130,125" stroke="#b8d4c5" stroke-width="3" fill="none"/>
            <!-- Dots and patterns -->
            <circle cx="80" cy="100" r="3" fill="#c5b8d4"/>
            <circle cx="100" cy="98" r="3" fill="#d4a574"/>
            <circle cx="120" cy="100" r="3" fill="#b8d4c5"/>
            <circle cx="85" cy="115" r="2.5" fill="#d4af6a"/>
            <circle cx="115" cy="115" r="2.5" fill="#c5b8d4"/>
            <!-- Zigzag pattern -->
            <path d="M75,135 L80,130 L85,135 L90,130 L95,135" stroke="#d4a574" stroke-width="2" fill="none"/>
            <path d="M105,135 L110,130 L115,135 L120,130 L125,135" stroke="#b8d4c5" stroke-width="2" fill="none"/>
            <!-- Paint brush nearby -->
            <rect x="135" y="130" width="3" height="25" fill="#8b9d83"/>
            <ellipse cx="136.5" cy="128" rx="5" ry="4" fill="#c5b8d4"/>
            <!-- Sparkles -->
            <circle cx="70" cy="75" r="2" fill="#c5b8d4"/>
            <circle cx="130" cy="80" r="2" fill="#d4a574"/>
        </svg>`;
    }
    static createPath() {
        return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="path-glow" cx="50%" cy="50%">
                    <stop offset="0%" style="stop-color:#b8d4c5;stop-opacity:0.5" />
                    <stop offset="100%" style="stop-color:#8b9d83;stop-opacity:0.2" />
                </radialGradient>
            </defs>
            <!-- Nature's call -->
            <circle cx="100" cy="100" r="75" fill="url(#path-glow)"/>
            <!-- Winding path -->
            <path d="M50,150 Q70,130 90,120 Q110,110 130,100 Q150,90 160,70"
                  stroke="#d4a574" stroke-width="8" fill="none" opacity="0.6"/>
            <path d="M50,150 Q70,130 90,120 Q110,110 130,100 Q150,90 160,70"
                  stroke="#c9a9a3" stroke-width="6" fill="none" opacity="0.4"/>
            <!-- Trees along path -->
            <ellipse cx="70" cy="100" rx="15" ry="20" fill="#8b9d83" opacity="0.7"/>
            <rect x="67" y="115" width="6" height="15" fill="#6b7c5d"/>
            <ellipse cx="140" cy="80" rx="12" ry:="16" fill="#8b9d83" opacity="0.7"/>
            <rect x="137" y="92" width="6" height="12" fill="#6b7c5d"/>
            <!-- Wildflowers -->
            <circle cx="60" cy="135" r="3" fill="#d4af6a"/>
            <circle cx="100" cy="115" r="3" fill="#c5b8d4"/>
            <circle cx="145" cy="95" r="3" fill="#f4d4ba"/>
            <!-- Footprints -->
            <ellipse cx="80" cy="125" rx="4" ry="6" fill="#6b7c5d" opacity="0.3" transform="rotate(-30 80 125)"/>
            <ellipse cx="110" cy="112" rx="4" ry="6" fill="#6b7c5d" opacity="0.3" transform="rotate(-20 110 112)"/>
            <!-- Sun rays -->
            <circle cx="160" cy="50" r="15" fill="#f4d4ba" opacity="0.6"/>
            <line x1="160" y1="35" x2="160" y2="25" stroke="#d4af6a" stroke-width="2"/>
            <line x1="175" y1="50" x2="185" y2="50" stroke="#d4af6a" stroke-width="2"/>
        </svg>`;
    }
}

// Made with Bob
