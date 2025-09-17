import React from 'react';
import { FaPlane } from 'react-icons/fa';

function Navbar({ onNavClick }) {
    const handleClick = (path) => {
        if (typeof onNavClick === 'function') {
            onNavClick(path);
        } else {
            console.error('onNavClick is not a function');
        }
    };

    return (
        <header className="bg-gradient-to-r from-gray-700 to-gray-600 p-6 shadow-lg">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-100 flex items-center">
                    <FaPlane className="mr-2" /> Airport System
                </h1>
                <nav>
                    <button onClick={() => handleClick('/')} className="text-gray-300 mx-4 hover:text-gray-100 transition">Home</button>
                    <button onClick={() => handleClick('/flights')} className="text-gray-300 mx-4 hover:text-gray-100 transition">Flights</button>
                    <button onClick={() => handleClick('/support')} className="text-gray-300 mx-4 hover:text-gray-100 transition">Support</button>
                    <button onClick={() => handleClick('/profile')} className="text-gray-300 mx-4 hover:text-gray-100 transition">Profile</button>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;