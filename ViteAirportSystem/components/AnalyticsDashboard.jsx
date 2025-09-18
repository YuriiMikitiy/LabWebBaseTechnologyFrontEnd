import React, { useState, useEffect } from 'react';
import { Line } from 'chart.js/auto'; // або import { Bar } тощо

function AnalyticsDashboard() {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        fetch(`https://labwebbasetechnologybackend.onrender.com/api/analytics/logs`) // Ендпоінт для логів (додамо нижче)
            .then((res) => res.json())
            .then((data) => {
                const labels = data.map(log => new Date(log.timestamp).toLocaleTimeString());
                const counts = data.map(log => log.count);
                setChartData({
                    labels,
                    datasets: [{
                        label: 'Кількість запитів',
                        data: counts,
                        borderColor: '#36A2EB',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        fill: true,
                    }]
                });
            })
            .catch((err) => console.error('Error fetching analytics:', err));
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-700 rounded-lg shadow-lg text-gray-200">
            <h2 className="text-2xl font-semibold mb-4">Аналітика запитів</h2>
            <div>
                <canvas id="analyticsChart"></canvas>
            </div>
            <script>
                {`
                    new Chart(document.getElementById('analyticsChart').getContext('2d'), {
                        type: 'line',
                        data: ${JSON.stringify(chartData)},
                    });
                `}
            </script>
        </div>
    );
}

export default AnalyticsDashboard;