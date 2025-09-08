import React, { useState } from 'react';
// import { FaSearch } from 'react-icons/fa';

function FlightSearchForm({ onSearch }) {
    const [formData, setFormData] = useState({ from: '', to: '', date: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(formData);
    };

    return (
        <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-100 mb-4">Search Flights</h2>
            <div className="bg-gray-700 p-6 rounded-lg shadow">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        name="from"
                        value={formData.from}
                        onChange={handleChange}
                        placeholder="From (e.g., Kyiv)"
                        className="p-2 rounded bg-gray-600 text-gray-200 border border-gray-500 focus:outline-none focus:border-gray-400"
                    />
                    <input
                        type="text"
                        name="to"
                        value={formData.to}
                        onChange={handleChange}
                        placeholder="To (e.g., Lviv)"
                        className="p-2 rounded bg-gray-600 text-gray-200 border border-gray-500 focus:outline-none focus:border-gray-400"
                    />
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="p-2 rounded bg-gray-600 text-gray-200 border border-gray-500 focus:outline-none focus:border-gray-400"
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className="mt-4 px-4 py-2 bg-gray-500 text-gray-100 rounded hover:bg-gray-400 transition flex items-center"
                >
                    {/* <FaSearch className="mr-2" />  */}
                    Search
                </button>
            </div>
        </section>
    );
}

export default FlightSearchForm;