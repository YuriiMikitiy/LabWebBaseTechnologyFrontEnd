import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
    const navigate = useNavigate();

    const [isRegister, setIsRegister] = useState(false); // toggle між реєстрацією і входом
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (token) {
            navigate('/'); // якщо токен вже є — одразу на головну
        }
    }, [token, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('${process.env.VITE_API_URL}/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Registered successfully! You can login now.');
                setIsRegister(false); // після реєстрації переключаємо на форму логіну
            } else {
                setMessage(data.message || 'Error registering.');
            }
        } catch (error) {
            setMessage('Server error.');
        }
    };

   const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('${process.env.VITE_API_URL}/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: userData.email, password: userData.password })
        });

        const data = await response.json();

        if (response.ok) {
            setToken(data.token);
            localStorage.setItem('token', data.token);
            setMessage('Logged in successfully!');
            navigate('/'); // редірект на головну
        } else if (response.status === 400 || response.status === 401) {
            setMessage('Invalid email or password.');
        } else {
            setMessage(data.message || 'Login failed.');
        }
    } catch (error) {
        setMessage('Server error. Please try again later.');
    }
};

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-700 rounded-lg shadow-lg mt-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-200 text-center">
                {isRegister ? 'Register' : 'Login'}
            </h2>
            
            <form className="space-y-4">
                {isRegister && (
                    <input
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                        placeholder="Username"
                        className="w-full p-2 bg-gray-600 text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                )}
                <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full p-2 bg-gray-600 text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full p-2 bg-gray-600 text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {isRegister ? (
                    <button 
                        onClick={handleRegister} 
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-500 transition">
                        Register
                    </button>
                ) : (
                    <button 
                        onClick={handleLogin} 
                        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-500 transition">
                        Login
                    </button>
                )}
            </form>

            <div className="mt-4 text-center">
                <button
                    onClick={() => setIsRegister(!isRegister)}
                    className="text-blue-400 hover:underline"
                >
                    {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
                </button>
            </div>

            {message && <p className="mt-4 text-center text-gray-300">{message}</p>}
        </div>
    );
}

export default UserProfile;
