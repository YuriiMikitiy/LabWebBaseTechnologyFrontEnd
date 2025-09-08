import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import FlightSearchForm from '../components/FlightSearchForm';
import FlightList from '../components/FlightList';

const mockFlights = [
    { id: 1, from: 'Kyiv', to: 'Lviv', time: '08:00', status: 'On Time' },
    { id: 2, from: 'Kyiv', to: 'Odesa', time: '10:30', status: 'Delayed' },
    { id: 3, from: 'Lviv', to: 'Kharkiv', time: '12:15', status: 'On Time' },
];

function App() {
    const [flights, setFlights] = useState(mockFlights);
    const [search, setSearch] = useState({ from: '', to: '', date: '' });

    const handleSearch = (searchData) => {
        setSearch(searchData);
        const filtered = mockFlights.filter(
            (flight) =>
                flight.from.toLowerCase().includes(searchData.from.toLowerCase()) &&
                flight.to.toLowerCase().includes(searchData.to.toLowerCase())
        );
        setFlights(filtered);
    };

    return (
        <div className="h-full bg-gray-800">
            <Navbar />
            <main className="w-auto mx-auto p-6">
                <FlightSearchForm onSearch={handleSearch} />
                <FlightList flights={flights} />
            </main>
        </div>
    );
}

export default App;