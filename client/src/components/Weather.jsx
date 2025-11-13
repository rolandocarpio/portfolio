import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css"

export default function Weather() {
    const [weatherData, setWeatherData] = useState(null);
    const fetchWeather = async () => {
        try {
            const response = await axios.get("http://localhost:3000/");
            const data = response.data;
            console.log(response.data);
            setWeatherData({
                temperature: Math.floor(data.current.temp_f),
                icon: data.current.condition.icon,
                isDay: data.current.is_day === 1,
            });
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }
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