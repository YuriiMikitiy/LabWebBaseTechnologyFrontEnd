import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

function FlightPredictor() {
    const [weather, setWeather] = useState('');
    const [delayProbability, setDelayProbability] = useState(0);
    const [prediction, setPrediction] = useState('');
    const [model, setModel] = useState(null);

    useEffect(() => {
        fetch('https://localhost:44392/Flight/data')
            .then((res) => res.json())
            .then((data) => {
                console.log('Raw training data:', data);
                trainModel(data);
            })
            .catch((err) => console.error('Error loading training data:', err));
    }, []);

    const trainModel = async (data) => {
        const weatherMap = { 'Clear': 0, 'Rain': 1, 'Cloudy': 2, 'Storm': 3, 'Fog': 4 };
        const statusMap = { 'On Time': 0, 'Delayed': 1, 'Cancelled': 2 };

        // Prepare input data with explicit property access
        const xsData = data.map(d => [
            weatherMap[d.weather] || 0, // Змінив на 'weather' (можливо, ключ у JSON малий)
            d.delayProbability !== undefined ? d.delayProbability : 0 // Явна перевірка
        ]);

        const xs = tf.tensor2d(xsData);

        // Prepare output data with error handling
        const ysData = data.map(d => {
            const statusNum = statusMap[d.status]; // Змінив на 'status' (можливо, ключ у JSON малий)
            if (statusNum === undefined) {
                console.warn(`Unknown status: ${d.status}, defaulting to On Time`);
                return 0;
            }
            return statusNum;
        });

        const ys = tf.oneHot(tf.tensor1d(ysData, 'int32'), 3);

        // Define and compile model
        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 10, activation: 'relu', inputShape: [2] }));
        model.add(tf.layers.dense({ units: 3, activation: 'softmax' }));

        model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['accuracy'] });

        // Train model
        try {
            await model.fit(xs, ys, {
                epochs: 200,
                validationSplit: 0.2,
                callbacks: {
                    onEpochEnd: (epoch, log) => console.log(`Epoch ${epoch}: loss = ${log.loss}, acc = ${log.acc}`),
                    onTrainEnd: () => console.log('Training completed')
                }
            });
            setModel(model);
            console.log('Model trained successfully');
        } catch (error) {
            console.error('Training failed:', error);
        }
    };

    const predictStatus = () => {
        if (!model) {
            console.log('Model not ready');
            return;
        }

        const weatherMap = { 'Clear': 0, 'Rain': 1, 'Cloudy': 2, 'Storm': 3, 'Fog': 4 };
        const statusMap = { 0: 'On Time', 1: 'Delayed', 2: 'Cancelled' };

        const input = tf.tensor2d([[weatherMap[weather] || 0, delayProbability]]);

        const prediction = model.predict(input);

        const predictedClass = prediction.argMax(-1).dataSync()[0];

        setPrediction(statusMap[predictedClass]);
    };

    return (
        <div className="mt-6 p-4 bg-gray-700 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-200">Flight Status Predictor</h3>
            <div className="space-y-4">
                <select
                    value={weather}
                    onChange={(e) => setWeather(e.target.value)}
                    className="w-full p-2 bg-gray-600 text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select Weather</option>
                    <option value="Clear">Clear</option>
                    <option value="Rain">Rain</option>
                    <option value="Cloudy">Cloudy</option>
                    <option value="Storm">Storm</option>
                    <option value="Fog">Fog</option>
                </select>
                <input
                    type="number"
                    value={delayProbability}
                    onChange={(e) => setDelayProbability(parseFloat(e.target.value) || 0)}
                    placeholder="Delay Probability (0-1)"
                    min="0"
                    max="1"
                    step="0.1"
                    className="w-full p-2 bg-gray-600 text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={predictStatus}
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-500 transition"
                >
                    Predict Status
                </button>
                {prediction && <p className="mt-2 text-center text-gray-300">Predicted Status: {prediction}</p>}
            </div>
        </div>
    );
}

export default FlightPredictor;