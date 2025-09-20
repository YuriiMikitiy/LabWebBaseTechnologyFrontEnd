import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function PaymentForm({ booking }) {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        const paymentRequest = {
            FlightId: booking.FlightId,
            UserId: booking.UserId,
            UserName: booking.UserName,
            Email: booking.Email,
            Amount: 100.00 // Приклад суми (замініть на динамічну логіку)
        };

        const response = await fetch(`https://labwebbasetechnologybackend.onrender.com/api/payment/create-checkout-session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paymentRequest),
        });
        const { sessionId } = await response.json();

        const { error: redirectError } = await stripe.redirectToCheckout({ sessionId });
        if (redirectError) setError(redirectError.message);
        else setSuccess(true);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-700 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Оплата бронювання</h3>
            <CardElement className="p-2 border border-gray-600 rounded mb-4" />
            <button type="submit" disabled={!stripe} className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-500 transition">
                Оплатити {booking.Amount || 100} UAH
            </button>
            {error && <p className="mt-2 text-red-400">{error}</p>}
            {success && <p className="mt-2 text-green-400">Платіж успішний!</p>}
        </form>
    );
}

function PaymentWrapper({ booking }) {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm booking={booking} />
        </Elements>
    );
}

export default PaymentWrapper;