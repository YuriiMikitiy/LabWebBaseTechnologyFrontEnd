import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FlightSearchForm from '../components/FlightSearchForm';
import FlightList from '../components/FlightList';
import LoginPage from '../components/LoginPage';
import ChatBot from '../components/ChatBot';
import UserProfile from '../components/UserProfile';
import FlightPredictor from '../components/FlightPredictor';
import AnalyticsDashboard from '../components/AnalyticsDashboard';

function AppContent() {
    const [flights, setFlights] = useState([]);
    const [search, setSearch] = useState({ from: '', to: '', date: '' });
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://labwebbasetechnologybackend.onrender.com/flight')
            .then((res) => res.json())
            .then((data) => setFlights(data))
            .catch((err) => console.error('Error fetching flights:', err));
    }, []);

    const handleSearch = (searchData) => {
        setSearch(searchData);
        fetch('https://labwebbasetechnologybackend.onrender.com/flight')
            .then((res) => res.json())
            .then((data) => {
                const filtered = data.filter(
                    (flight) =>
                        flight.from.toLowerCase().includes(searchData.from.toLowerCase()) &&
                        flight.to.toLowerCase().includes(searchData.to.toLowerCase())
                );
                setFlights(filtered);
            })
            .catch((err) => console.error('Error fetching flights:', err));
    };

    const handleNavClick = (path) => {
        navigate(path);
    };

    return (
        <div className="min-h-screen bg-gray-800 text-gray-200">
            <Navbar onNavClick={handleNavClick} />
            <Routes>
                <Route path="/" element={
                    <main className="max-w-6xl mx-auto p-6">
                        <FlightSearchForm onSearch={handleSearch} />
                        <FlightList flights={flights} />
                    </main>
                } />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/flights" element={
                    <main className="max-w-6xl mx-auto p-6">
                        <FlightSearchForm onSearch={handleSearch} />
                        <FlightList flights={flights} />
                        <FlightPredictor />
                    </main>
                } />
                <Route path="/support" element={
                    <main className="max-w-6xl mx-auto p-6">
                        <h2 className="text-2xl font-semibold mb-4">Support Page</h2>
                        <p className="text-gray-400 mb-6">Contact us at support@airportx.ua for assistance!</p>
                        <ChatBot />
                    </main>
                } />
                <Route path="/chat" element={<ChatBot />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/analytics" element={<AnalyticsDashboard />} />
            </Routes>
        </div>
    );
}

function App() {
    return <AppContent />;
}

export default App;