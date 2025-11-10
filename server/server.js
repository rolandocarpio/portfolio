import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(
            "http://api.weatherapi.com/v1/current.json",
            {
                params: {
                    key: process.env.WEATHER_API_KEY,
                    q: "auto:ip", // get location based on IP
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});