// Lunar Gardening Calendar
class LunarCalendar {
    constructor() {
        this.currentDate = new Date();
        this.currentMonth = this.currentDate.getMonth();
        this.currentYear = this.currentDate.getFullYear();
        
        this.gardeningTasks = this.getGardeningTasks();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderCalendar();
    }

    setupEventListeners() {
        // Hamburger menu
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

        // Month navigation
        const prevButton = document.getElementById('prevMonth');
        const nextButton = document.getElementById('nextMonth');
        
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                this.currentMonth--;
                if (this.currentMonth < 0) {
                    this.currentMonth = 11;
                    this.currentYear--;
                }
                this.renderCalendar();
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                this.currentMonth++;
                if (this.currentMonth > 11) {
                    this.currentMonth = 0;
                    this.currentYear++;
                }
                this.renderCalendar();
            });
        }
    }

    getMoonPhaseForDate(date) {
        const knownNewMoon = new Date(Date.UTC(2000, 0, 6, 18, 14, 0));
        const lunarCycle = 29.53058867;
        
        const daysSinceKnownNew = (date - knownNewMoon) / (1000 * 60 * 60 * 24);
        const cyclePosition = daysSinceKnownNew % lunarCycle;
        const phase = cyclePosition / lunarCycle;
        
        let phaseName, phaseIcon, phaseClass;
        
        if (phase < 0.0625 || phase >= 0.9375) {
            phaseName = "New Moon";
            phaseIcon = "🌑";
            phaseClass = "new-moon";
        } else if (phase < 0.1875) {
            phaseName = "Waxing Crescent";
            phaseIcon = "🌒";
            phaseClass = "waxing-crescent";
        } else if (phase < 0.3125) {
            phaseName = "First Quarter";
            phaseIcon = "🌓";
            phaseClass = "first-quarter";
        } else if (phase < 0.4375) {
            phaseName = "Waxing Gibbous";
            phaseIcon = "🌔";
            phaseClass = "waxing-gibbous";
        } else if (phase < 0.5625) {
            phaseName = "Full Moon";
            phaseIcon = "🌕";
            phaseClass = "full-moon";
        } else if (phase < 0.6875) {
            phaseName = "Waning Gibbous";
            phaseIcon = "🌖";
            phaseClass = "waning-gibbous";
        } else if (phase < 0.8125) {
            phaseName = "Last Quarter";
            phaseIcon = "🌗";
            phaseClass = "last-quarter";
        } else {
            phaseName = "Waning Crescent";
            phaseIcon = "🌘";
            phaseClass = "waning-crescent";
        }
        
        return { phaseName, phaseIcon, phaseClass, phase };
    }

    getGardeningTasks() {
        return {
            "New Moon": [
                "🌱 Plant leafy greens (lettuce, spinach, kale)",
                "✨ Set intentions for the growing season",
                "🌿 Start seeds indoors",
                "📝 Plan your garden layout"
            ],
            "Waxing Crescent": [
                "🌾 Plant above-ground crops (beans, peas, tomatoes)",
                "💧 Water deeply as energy rises",
                "🌱 Transplant seedlings",
                "🌸 Plant annual flowers"
            ],
            "First Quarter": [
                "🍅 Plant fruiting crops (tomatoes, peppers, squash)",
                "⚡ Fertilize growing plants",
                "🌿 Prune for growth",
                "🌻 Plant flowering herbs"
            ],
            "Waxing Gibbous": [
                "🌸 Nurture and tend existing plants",
                "💚 Mulch garden beds",
                "🐛 Check for pests",
                "💧 Maintain consistent watering"
            ],
            "Full Moon": [
                "🥕 Plant root vegetables (carrots, beets, potatoes)",
                "🌾 Harvest herbs at peak potency",
                "🌕 Celebrate garden abundance",
                "🌿 Plant perennials"
            ],
            "Waning Gibbous": [
                "🍂 Harvest mature crops",
                "🤝 Share abundance with community",
                "🌱 Save seeds for next season",
                "📚 Document garden successes"
            ],
            "Last Quarter": [
                "✂️ Prune and trim plants",
                "🌿 Remove weeds",
                "🍂 Clear spent plants",
                "🛌 Let soil rest"
            ],
            "Waning Crescent": [
                "🧘 Reflect on the growing cycle",
                "🔧 Maintain tools and equipment",
                "📖 Study and plan",
                "🌙 Prepare for new moon planting"
            ]
        };
    }

    getTasksForPhase(phaseName) {
        return this.gardeningTasks[phaseName] || [];
    }

    renderCalendar() {
        const monthNames = ["January", "February", "March", "April", "May", "June",
                          "July", "August", "September", "October", "November", "December"];
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        
        // Update month display
        document.getElementById('currentMonth').textContent = 
            `${monthNames[this.currentMonth]} ${this.currentYear}`;
        
        // Get first day of month and number of days
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        
        const calendarGrid = document.getElementById('calendarGrid');
        calendarGrid.innerHTML = '';
        
        // Add day name headers
        dayNames.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'day-name';
            dayHeader.textContent = day;
            calendarGrid.appendChild(dayHeader);
        });
        
        // Add empty cells for days before month starts
        for (let i = 0; i < startingDayOfWeek; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(this.currentYear, this.currentMonth, day);
            const moonPhase = this.getMoonPhaseForDate(date);
            const tasks = this.getTasksForPhase(moonPhase.phaseName);
            
            const dayElement = document.createElement('div');
            dayElement.className = `calendar-day ${moonPhase.phaseClass}`;
            
            // Check if today
            const today = new Date();
            if (date.toDateString() === today.toDateString()) {
                dayElement.classList.add('today');
            }
            
            // Create day header
            const dayHeader = document.createElement('div');
            dayHeader.className = 'day-header';
            dayHeader.innerHTML = `
                <span class="day-number">${day}</span>
                <span class="moon-icon" title="${moonPhase.phaseName}">${moonPhase.phaseIcon}</span>
            `;
            dayElement.appendChild(dayHeader);
            
            // Add tasks
            if (tasks.length > 0) {
                const tasksContainer = document.createElement('div');
                tasksContainer.className = 'day-tasks';
                
                // Initially show first 2 tasks
                const initialTasks = tasks.slice(0, 2);
                initialTasks.forEach(task => {
                    const taskItem = document.createElement('div');
                    taskItem.className = 'task-item';
                    taskItem.textContent = task;
                    tasksContainer.appendChild(taskItem);
                });
                
                // Add hidden tasks
                if (tasks.length > 2) {
                    const hiddenTasks = tasks.slice(2);
                    hiddenTasks.forEach(task => {
                        const taskItem = document.createElement('div');
                        taskItem.className = 'task-item hidden-task';
                        taskItem.textContent = task;
                        taskItem.style.display = 'none';
                        tasksContainer.appendChild(taskItem);
                    });
                    
                    // Add expand/collapse button
                    const moreButton = document.createElement('div');
                    moreButton.className = 'more-tasks-button';
                    moreButton.textContent = `+${tasks.length - 2} more tasks`;
                    moreButton.style.cursor = 'pointer';
                    moreButton.style.fontSize = '0.85em';
                    moreButton.style.color = 'var(--warm-gold)';
                    moreButton.style.marginTop = '8px';
                    moreButton.style.fontWeight = 'bold';
                    moreButton.style.textAlign = 'center';
                    moreButton.style.padding = '5px';
                    moreButton.style.background = 'rgba(212, 175, 106, 0.2)';
                    moreButton.style.borderRadius = '5px';
                    moreButton.style.transition = 'all 0.3s ease';
                    
                    moreButton.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const hiddenTaskElements = tasksContainer.querySelectorAll('.hidden-task');
                        const isExpanded = hiddenTaskElements[0].style.display !== 'none';
                        
                        hiddenTaskElements.forEach(task => {
                            task.style.display = isExpanded ? 'none' : 'block';
                        });
                        
                        moreButton.textContent = isExpanded
                            ? `+${tasks.length - 2} more tasks`
                            : 'Show less';
                    });
                    
                    moreButton.addEventListener('mouseenter', () => {
                        moreButton.style.background = 'rgba(212, 175, 106, 0.4)';
                        moreButton.style.transform = 'scale(1.05)';
                    });
                    
                    moreButton.addEventListener('mouseleave', () => {
                        moreButton.style.background = 'rgba(212, 175, 106, 0.2)';
                        moreButton.style.transform = 'scale(1)';
                    });
                    
                    tasksContainer.appendChild(moreButton);
                }
                
                dayElement.appendChild(tasksContainer);
            }
            
            calendarGrid.appendChild(dayElement);
        }
    }
}

// Initialize calendar when page loads
document.addEventListener('DOMContentLoaded', () => {
    new LunarCalendar();
});

// Made with Bob