# 🌱 Garden Weather Oracle 🌙

A mystical gardening companion that combines oracle card readings with lunar calendar guidance and your personal seed inventory from Notion.

## ✨ Features

- **🔮 Oracle Cards**: Draw mystical gardening guidance cards with beautiful illustrations
- **🌙 Lunar Calendar**: Month view with accurate moon phases and gardening tasks
- **🌱 My Seeds**: Your personal seed inventory synced from Notion database
- **📅 Biodynamic Planting**: Recommendations based on moon phases
- **🔍 Smart Filtering**: Search and filter seeds by type, season, and moon phase

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- A Notion account with a seed database
- Notion API integration token

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd /Users/libbylavrova/Documents/Garden-Weather-Oracle
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   The `.env` file is already configured with your Notion credentials:
   ```
   NOTION_TOKEN=your_token_here
   NOTION_DATABASE_ID=your_database_id_here
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📖 Usage

### Oracle Cards Page
- Click "Draw Card" to receive mystical gardening guidance
- Each card features unique, hand-crafted SVG illustrations
- 44 different cards with seasonal themes

### Lunar Calendar
- View current month with accurate moon phases
- Each day shows 2-4 gardening tasks appropriate for that moon phase
- Click "+X more tasks" to expand full task list
- Navigate between months with Previous/Next buttons

### My Seeds Page
- Automatically syncs your seed inventory from Notion
- Filter by:
  - Search (name, variety, notes)
  - Plant type
  - Planting season
  - Best moon phase
- Click "Refresh" to sync latest data from Notion
- Data cached for 6 hours for performance

## 🏗️ Architecture

### Frontend
- Pure JavaScript (no frameworks)
- Modular class-based architecture
- localStorage caching for performance
- Responsive design with whimsical aesthetics

### Backend
- Express.js server
- Notion API proxy (solves CORS issues)
- Secure credential management
- RESTful API endpoints

### Key Files
```
├── index.html              # Oracle Cards page
├── calendar.html           # Lunar Calendar page
├── seeds.html             # My Seeds page
├── server.js              # Express server with Notion proxy
├── .env                   # Environment variables (not in git)
├── js/
│   ├── app.js            # Main app controller
│   ├── cards.js          # Oracle card logic
│   ├── illustrations.js  # SVG card illustrations
│   ├── moon.js           # Moon phase calculations
│   ├── calendar.js       # Lunar calendar controller
│   ├── notion-client.js  # Notion API client
│   ├── config.js         # Configuration loader
│   └── seeds.js          # Seeds page controller
└── css/
    ├── styles.css        # Global styles
    ├── calendar.css      # Calendar-specific styles
    └── seeds.css         # Seeds page styles
```

## 🌙 Moon Phase Calculations

The app uses accurate astronomical calculations:
- Reference date: January 6, 2000 (known new moon)
- Lunar cycle: 29.53058867 days
- Calculates phase for any date with precision

## 🔧 API Endpoints

### `POST /api/notion/query`
Proxy endpoint for Notion database queries
- Handles pagination
- Returns seed records in JSON format

### `GET /api/health`
Health check endpoint
- Returns server status
- Confirms Notion configuration

## 🎨 Design Philosophy

- **Whimsical & Mystical**: Soft colors, gentle animations, magical elements
- **Nature-Inspired**: Sage green, warm gold, dusty rose, cream, lavender
- **Accessible**: Clear typography, good contrast, responsive design
- **Intuitive**: Simple navigation, clear visual hierarchy

## 🔐 Security Notes

- `.env` file contains sensitive credentials
- Never commit `.env` to version control
- Backend proxy keeps API tokens secure
- Consider using environment variables in production

## 🐛 Troubleshooting

### "Failed to fetch" error
- Make sure the server is running (`npm start`)
- Check that you're accessing via `http://localhost:3000` (not `file://`)
- Verify `.env` file has correct Notion credentials

### Seeds not loading
- Check Notion API token is valid
- Verify database ID is correct
- Check browser console for detailed error messages
- Try clicking "Refresh" button

### Moon phase incorrect
- Clear browser cache
- Check system date/time is correct
- Moon calculations are based on UTC time

## 📝 Future Enhancements

- [ ] Integrate seed recommendations into calendar
- [ ] Show "Plant Today" suggestions based on current moon phase
- [ ] Add seed planting history tracking
- [ ] Create personalized planting schedules
- [ ] Export calendar to PDF
- [ ] Mobile app version
- [ ] Weather integration
- [ ] Garden journal feature

## 🙏 Credits

Built with love for mystical gardening 🌱✨

Made with Bob (AI Assistant)