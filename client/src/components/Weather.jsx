import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css"

export default function Weather() {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchWeather = async (coords) => {
        try {
            setLoading(true);
            // Use Vite env var (must be prefixed VITE_) or fallback to relative proxy
            const serverBase = import.meta.env.VITE_API_URL || '';
            const base = serverBase.replace(/\/$/, '');
            const url = base ? `${base}/api/weather` : `/api/weather`;

            const params = {};
            if (coords && typeof coords.latitude === 'number' && typeof coords.longitude === 'number') {
                params.q = `${coords.latitude},${coords.longitude}`;
            }

            const response = await axios.get(url, { params });
            const data = response.data;
            setWeatherData({
                temperature: Math.floor(data.current?.temp_f ?? data.current?.temp ?? 0),
                icon: data.current?.condition?.icon ?? '',
                isDay: data.current?.is_day === 1,
            });
            setError(null);
        } catch (err) {
            console.error('Error fetching weather data:', err);
            setError(err?.message || 'Unknown error');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        // Try browser geolocation first
        if (navigator && navigator.geolocation) {
            const geoSuccess = (position) => {
                const { coords } = position;
                fetchWeather(coords);
            };
            const geoError = (err) => {
                console.warn('Geolocation failed or denied, falling back to IP-based lookup.', err);
                // Fallback to server IP-based lookup
                fetchWeather();
            };
            navigator.geolocation.getCurrentPosition(geoSuccess, geoError, { maximumAge: 60_000, timeout: 10_000 });
        } else {
            // If geolocation not supported, fallback to server IP-based lookup
            fetchWeather();
        }
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