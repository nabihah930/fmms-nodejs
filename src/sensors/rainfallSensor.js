import { producer } from '../kafka.js';
import { generateValue } from '../util/helpers.js';
import { isThresholdBreached } from '../thresholdEvaluator.js';
import eventEmitter from '../eventEmitter.js';

// Default: 5 minutes
let interval = 300000;

const simulateRainfall = async () => {
    // const cumulativeRainfall = (Math.random() * 5 + 0.1).toFixed(2);
    const cumulativeRainfall = generateValue(
        (threshold) => (Math.random() * (threshold / 2)).toFixed(2), // Within range
        (threshold) => (threshold / 2 + Math.random() * (threshold / 2)).toFixed(2), // Exceed range
        100
    );
    const region = `region${Math.floor(Math.random() * 10) + 1}`; // Random region for testing
    const topic = `${region}cumulativeRainfall`;

    const breached = isThresholdBreached('cumulativeRainfall', parseFloat(cumulativeRainfall));
    console.log(`\nTopic: ${topic} - Breached: ${breached}\n`);

    // Adjust frequency based on threshold breach
    if (breached && interval !== 120000) {
        interval = 120000;
        console.log('⚠ Rainfall threshold breached! Increasing frequency to 2 minutes.');
        eventEmitter.emit('thresholdBreached', {
            type: 'cumulativeRainfall',
            value: cumulativeRainfall,
            timestamp: Date.now(),
            region,
            message: `Rainfall threshold breached in ${region} on ${new Date().toISOString()}.`
        });

        resetInterval();
    } else if (!breached && interval !== 300000) {
        interval = 300000;
        console.log('✔ Rainfall back to normal. Resetting frequency to 5 minutes.');
        resetInterval();
    }

    try {
        await producer.send({
        topic,
        messages: [
            {
            value: JSON.stringify({
                type: 'cumulativeRainfall',
                value: cumulativeRainfall,
                region,
                timestamp: Date.now(),
            }),
            },
        ],
        });

        console.log(`✔ Sent rainfall data to Kafka topic ${topic}`);
    } catch (error) {
        console.error(`🔴 Error sending data to Kafka topic: ${topic}\nError: `, error.message);
    }
};

// Reset interval when the frequency is adjusted
let intervalId = setInterval(simulateRainfall, interval);

const resetInterval = () => {
    clearInterval(intervalId);
    intervalId = setInterval(simulateRainfall, interval);
};

// Simulate data every 5 minutes
// setInterval(simulateRainfall, 60000);

export default simulateRainfall;
