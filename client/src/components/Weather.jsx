import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css"

export default function Weather() {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const serverBase = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
        const url = serverBase ? `${serverBase}/api/weather` : `/api/weather`;

        axios.get(url)
            .then(res => {
                const data = res.data;
                setWeatherData({
                    temperature: Math.floor(data.current?.temp_f ?? data.current?.temp ?? 0),
                    icon: data.current?.condition?.icon ?? '',
                    isDay: data.current?.is_day === 1,
                });
            })
            .catch(err => setError(err?.message || 'Unknown error'))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="weather-container">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : !weatherData ? (
                <p>No weather data</p>
            ) : (
                <>
                    <p>{weatherData.temperature}°F</p>
                    <img src={`https:${weatherData.icon}`} className="weather-icon" alt="weather" />
                </>
            )}
        </div>
    );
}
