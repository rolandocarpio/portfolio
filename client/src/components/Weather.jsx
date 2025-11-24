import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css"

export default function Weather() {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const fetchWeather = async () => {
        try {
            // Use Vite env var (must be prefixed VITE_) or fallback to relative proxy
            const serverBase = import.meta.env.VITE_API_URL || '';
            const base = serverBase.replace(/\/$/, '');
            const url = base ? `${base}/api/weather` : `/api/weather`;
            const response = await axios.get(url);
            const data = response.data;
            setWeatherData({
                temperature: Math.floor(data.current?.temp_f ?? data.current?.temp ?? 0),
                icon: data.current?.condition?.icon ?? '',
                isDay: data.current?.is_day === 1,
            });
        } catch (err) {
            console.error('Error fetching weather data:', err);
            setError(err?.message || 'Unknown error');
        }
    };
    useEffect(() => {
        fetchWeather();
    }, []);
    return (
        <div className="weather-container">
            {!weatherData ? (
                <p>Loading...</p>
            ) : (
                <>
                <p>{weatherData.temperature}°F</p>
                <img src={`https:${weatherData.icon}`} className="weather-icon" />
                </>
            )}
        </div>

    );
}