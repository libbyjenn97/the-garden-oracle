// Moon phase calculation and animation
class MoonPhase {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.phase = this.getCurrentPhase();
        this.animationFrame = 0;
    }

    getCurrentPhase() {
        // More accurate moon phase calculation using astronomical algorithms
        const now = new Date();
        
        // Known new moon: January 6, 2000, 18:14 UTC
        const knownNewMoon = new Date(Date.UTC(2000, 0, 6, 18, 14, 0));
        const lunarCycle = 29.53058867; // Average lunar cycle in days
        
        // Calculate days since known new moon
        const daysSinceKnownNew = (now - knownNewMoon) / (1000 * 60 * 60 * 24);
        
        // Calculate current position in lunar cycle
        const cyclePosition = daysSinceKnownNew % lunarCycle;
        
        // Normalize to 0-1 range
        const phase = cyclePosition / lunarCycle;
        
        // Determine phase name based on position
        let phaseName, phaseValue;
        
        if (phase < 0.0625 || phase >= 0.9375) {
            phaseName = "New Moon";
            phaseValue = 0;
        } else if (phase < 0.1875) {
            phaseName = "Waxing Crescent";
            phaseValue = 0.125;
        } else if (phase < 0.3125) {
            phaseName = "First Quarter";
            phaseValue = 0.25;
        } else if (phase < 0.4375) {
            phaseName = "Waxing Gibbous";
            phaseValue = 0.375;
        } else if (phase < 0.5625) {
            phaseName = "Full Moon";
            phaseValue = 0.5;
        } else if (phase < 0.6875) {
            phaseName = "Waning Gibbous";
            phaseValue = 0.625;
        } else if (phase < 0.8125) {
            phaseName = "Last Quarter";
            phaseValue = 0.75;
        } else {
            phaseName = "Waning Crescent";
            phaseValue = 0.875;
        }
        
        return {
            name: phaseName,
            value: phaseValue,
            illumination: phase,
            cycleDay: Math.round(cyclePosition),
            date: now
        };
    }

    draw() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = 120;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Add subtle glow animation
        const glowIntensity = 0.3 + Math.sin(this.animationFrame * 0.02) * 0.1;
        
        // Draw outer glow
        const gradient = this.ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius * 1.5);
        gradient.addColorStop(0, `rgba(212, 175, 106, ${glowIntensity})`);
        gradient.addColorStop(1, 'rgba(212, 175, 106, 0)');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw moon circle (cream color)
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = '#f5f1e8';
        this.ctx.fill();
        
        // Draw shadow for phase
        const phase = this.phase.illumination;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.clip();
        
        // Shadow color (soft blue-grey)
        this.ctx.fillStyle = 'rgba(184, 197, 214, 0.7)';
        
        if (phase < 0.5) {
            // Waxing (shadow on left)
            const shadowWidth = radius * 2 * (0.5 - phase) * 2;
            this.ctx.fillRect(centerX - radius, centerY - radius, shadowWidth, radius * 2);
        } else {
            // Waning (shadow on right)
            const shadowWidth = radius * 2 * (phase - 0.5) * 2;
            this.ctx.fillRect(centerX + radius - shadowWidth, centerY - radius, shadowWidth, radius * 2);
        }
        
        this.ctx.restore();
        
        // Add subtle texture/craters
        this.drawCraters(centerX, centerY, radius);
        
        this.animationFrame++;
    }

    drawCraters(centerX, centerY, radius) {
        const craters = [
            { x: 0.3, y: -0.2, r: 0.15 },
            { x: -0.4, y: 0.1, r: 0.1 },
            { x: 0.1, y: 0.4, r: 0.12 },
            { x: -0.2, y: -0.3, r: 0.08 }
        ];
        
        craters.forEach(crater => {
            const x = centerX + crater.x * radius;
            const y = centerY + crater.y * radius;
            const r = crater.r * radius;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, r, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(201, 169, 163, 0.2)';
            this.ctx.fill();
        });
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }

    getPhaseDescription() {
        const descriptions = {
            "New Moon": "✨ Dark moon magic awakens! Set sacred intentions and plant leafy greens as gravitational forces stir seeds from slumber",
            "Waxing Crescent": "🌱 The maiden moon rises! Life force flows upward - perfect for leafy crops as cosmic energy builds",
            "First Quarter": "⚡ Lunar power peaks! Plant seedlings and fruiting crops as the moon's light strengthens your garden's vitality",
            "Waxing Gibbous": "🌸 Almost full, almost ripe! Nurture with patience as the moon swells with abundance",
            "Full Moon": "🌕 The goddess shines bright! Plant root vegetables as lunar energy pulls downward into the earth's embrace",
            "Waning Gibbous": "🙏 Gratitude flows like moonlight! Share your harvest and plant roots as energy descends",
            "Last Quarter": "🍂 The crone's wisdom speaks! Rest, prune, harvest - the moon whispers: release what no longer serves",
            "Waning Crescent": "🌙 Sacred stillness before rebirth. Reflect, maintain, prepare - avoid sowing as the moon dreams"
        };
        return descriptions[this.phase.name] || "The moon guides your garden";
    }

    updateDisplay() {
        document.getElementById('moonPhase').textContent = this.phase.name;
        document.getElementById('moonDescription').textContent = this.getPhaseDescription();
        
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('moonDate').textContent = this.phase.date.toLocaleDateString('en-NZ', options);
    }
}

// Made with Bob
