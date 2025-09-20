import React, { useState, useEffect } from 'react';

function WeatherDisplay({ city }) {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!city) return;

        setLoading(true);
        fetch(`https://labwebbasetechnologybackend.onrender.com/Flight/weather/${city}`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch weather');
                return res.json();
            })
            .then((data) => {
                setWeather(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [city]);

    if (loading) return <p className="text-gray-400">Loading weather...</p>;
    if (error) return <p className="text-red-400">Error: {error}</p>;
    if (!weather) return null;

    return (
        <div className="mt-4 p-4 bg-gray-600 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Weather in {weather.city}</h3>
            <p>Temperature: {weather.temperature}°C</p>
            <p>Condition: {weather.description}</p>
            <p>Humidity: {weather.humidity}%</p>
            <h4 className="mt-2 font-semibold">Flight Status Updates:</h4>
            <ul>
                {weather.updatedFlights.map((flight) => (
                    <li key={flight.Id} className="text-gray-300">
                        Flight {flight.Id}: {flight.Status}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default WeatherDisplay;