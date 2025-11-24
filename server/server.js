import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(cors());

// Health route
app.get("/", (req, res) => {
    res.json({ status: "ok" });
});

// Proxy route for weather data. Server-side keeps the API key secret and avoids CORS issues.
app.get('/api/weather', async (req, res) => {
    const q = req.query.q || 'auto:ip';
    const apiUrl = process.env.WEATHER_API_BASE;

    if (!process.env.WEATHER_API_KEY) {
        return res.status(500).json({ error: 'Missing WEATHER_API_KEY on server' });
    }

    try {
        const response = await axios.get(apiUrl, {
            params: {
                key: process.env.WEATHER_API_KEY,
                q,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching weather:', error?.message || error);
        res.status(500).json({ error: error?.message || 'Unknown error' });
    }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});