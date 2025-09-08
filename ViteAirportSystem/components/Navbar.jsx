import React from 'react';
// import { FaPlane } from 'react-icons/fa';

function Navbar() {
    return (
        <header className="bg-gradient-to-r from-gray-700 to-gray-600 p-6 shadow-lg">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-100 flex items-center">
                    {/* <FaPlane className="mr-2" />  */}
                    Airport System
                </h1>
                <nav>
                    <a href="#" className="text-gray-300 mx-4 hover:text-gray-100 transition">Home</a>
                    <a href="#" className="text-gray-300 mx-4 hover:text-gray-100 transition">Flights</a>
                    <a href="#" className="text-gray-300 mx-4 hover:text-gray-100 transition">Support</a>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;