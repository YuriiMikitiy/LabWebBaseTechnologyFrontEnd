import React from 'react';

function FlightList({ flights }) {
    return (
        <section>
            <h2 className="text-2xl font-semibold text-gray-100 mb-4">Flight Schedule</h2>
            <div className="bg-gray-700 rounded-lg shadow overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-600">
                            <th className="p-4">From</th>
                            <th className="p-4">To</th>
                            <th className="p-4">Time</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flights.map((flight) => (
                            <tr key={flight.id} className="border-t border-gray-600">
                                <td className="p-4">{flight.from}</td>
                                <td className="p-4">{flight.to}</td>
                                <td className="p-4">{flight.time}</td>
                                <td className="p-4">
                                    <span
                                        className={
                                            flight.status === 'On Time'
                                                ? 'text-green-400'
                                                : 'text-red-400'
                                        }
                                    >
                                        {flight.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default FlightList;