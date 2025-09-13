import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Placeholder for login logic (e.g., API call)
        alert('Welcome to the coolest airport system! Redirecting to Home...');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                <h1 className="text-4xl font-bold text-blue-400 mb-4">Welcome to Airport X!</h1>
                <p className="text-gray-300 mb-6">
                    Our site is the coolest way to explore flights, book tickets, and enjoy a smart travel experience. Get ready to soar!
                </p>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-2 bg-gray-700 text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 bg-gray-700 text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-500 transition"
                    >
                        Log In
                    </button>
                </form>
                <p className="text-gray-400 mt-4">
                    Don’t have an account? <a href="#" className="text-blue-400 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;