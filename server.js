/**
 * Simple Express server to proxy Notion API requests
 * Solves CORS issues and keeps credentials secure
 */

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static('.'));

// Notion API proxy endpoint
app.post('/api/notion/query', async (req, res) => {
    try {
        const { start_cursor, page_size } = req.body;
        
        const notionToken = process.env.NOTION_TOKEN;
        const databaseId = process.env.NOTION_DATABASE_ID;
        
        if (!notionToken || !databaseId) {
            return res.status(500).json({
                error: 'Notion credentials not configured'
            });
        }

        const url = `https://api.notion.com/v1/databases/${databaseId}/query`;
        
        const body = {
            page_size: page_size || 100
        };
        
        if (start_cursor) {
            body.start_cursor = start_cursor;
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${notionToken}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const error = await response.json();
            return res.status(response.status).json({
                error: error.message || 'Notion API error'
            });
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error('Error proxying Notion request:', error);
        res.status(500).json({
            error: error.message || 'Internal server error'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        notion_configured: !!(process.env.NOTION_TOKEN && process.env.NOTION_DATABASE_ID)
    });
});

app.listen(PORT, () => {
    console.log(`\n🌱 Garden Weather Oracle Server`);
    console.log(`================================`);
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`✅ Notion API proxy: http://localhost:${PORT}/api/notion/query`);
    console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
    console.log(`\n📖 Open http://localhost:${PORT} in your browser\n`);
});

// Made with Bob
