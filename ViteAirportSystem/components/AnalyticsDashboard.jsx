import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function AnalyticsDashboard() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    fetch('https://labwebbasetechnologybackend.onrender.com/api/analytics/logs')
        .then(res => res.json())
        .then(data => {
            console.log('Logs from backend:', data); // <- перевірка
            const labels = data.map(log => new Date(log.timestamp).toLocaleTimeString());
            const counts = data.map(log => log.count);

            setChartData({
                labels,
                datasets: [
                    {
                        label: 'Кількість запитів',
                        data: counts,
                        borderColor: '#36A2EB',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        fill: true,
                    },
                ],
            });
        })
        .catch(err => console.error('Error fetching analytics:', err));
}, []);


  useEffect(() => {
    if (chartRef.current) {
      // Якщо графік вже є, видаляємо його перед створенням нового
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new Chart(chartRef.current, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: { color: 'white' },
            },
          },
          scales: {
            x: { ticks: { color: 'white' } },
            y: { ticks: { color: 'white' } },
          },
        },
      });
    }
  }, [chartData]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-700 rounded-lg shadow-lg text-gray-200">
      <h2 className="text-2xl font-semibold mb-4">Аналітика запитів</h2>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default AnalyticsDashboard;
