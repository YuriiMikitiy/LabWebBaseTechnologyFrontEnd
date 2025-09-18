import React, { useState } from 'react';
import { FaRobot, FaUser } from 'react-icons/fa';

function ChatBot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { type: 'user', text: input };
        setMessages([...messages, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('https://labwebbasetechnologybackend.onrender.com/api/Chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input }),
            });
            const data = await response.json();
            const botMessage = { type: 'bot', text: data.response };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            const errorMessage = { type: 'bot', text: 'Sorry, something went wrong. Try again!' };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-700 rounded-lg shadow-lg max-w-2xl mx-auto h-96 flex flex-col">
            <div className="p-4 bg-gray-600 rounded-t-lg flex items-center">
                <FaRobot className="mr-2" />
                <h3 className="text-lg font-semibold">Airport Assistant</h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-2">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs p-2 rounded-lg ${msg.type === 'user' ? 'bg-blue-600' : 'bg-gray-600'}`}>
                            <div className={`text-sm ${msg.type === 'user' ? 'text-white' : 'text-gray-200'}`}>{msg.text}</div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-600 p-2 rounded-lg">
                            <div className="text-sm text-gray-200">Typing...</div>
                        </div>
                    </div>
                )}
            </div>
            <form onSubmit={handleSubmit} className="p-4 waith-auto bg-gray-600 rounded-b-lg flex">
                <textarea
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about flights, delays, or bookings..."
                    className="flex-1 p-2 bg-gray-700 text-gray-200 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-500 transition">
                    Send
                </button>
            </form>
        </div>
    );
}

export default ChatBot;