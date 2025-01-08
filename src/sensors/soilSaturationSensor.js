import { producer } from '../kafka.js';
import { generateValue } from '../util/helpers.js';
import { isThresholdBreached } from '../thresholdEvaluator.js';
import eventEmitter from '../eventEmitter.js';

// Default: 5 minutes
let interval = 100;

const simulateSoilSaturation = async () => {
    const soilSaturation = generateValue(
        (threshold) => (Math.random() * (threshold - 40) + 40).toFixed(2), // Within range
        (threshold) => (threshold + Math.random() * 10).toFixed(2), // Exceed range
        75
    );
    const region = `region${Math.floor(Math.random() * 10) + 1}`; // Random region for testing
    const topic = `${region}soilSaturation`;

    // Check if soil saturation exceeds the threshold
    const breached = isThresholdBreached('soilSaturation', parseFloat(soilSaturation));
    console.log(`\nTopic: ${topic} - Breached: ${breached}\n`);

    // Adjust frequency based on threshold breach
    if (breached && interval !== 120000) {
        interval = 120000;
        console.log('⚠ Soil saturation threshold breached! Increasing frequency to 2 minutes.');
        eventEmitter.emit('thresholdBreached', {
            type: 'soilSaturation',
            value: soilSaturation,
            timestamp: Date.now(),
            region,
            message: `Soil saturation threshold breached in ${region} on ${new Date().toISOString()}.`
        });

        resetInterval();
    } else if (!breached && interval !== 100) {
        interval = 100;
        console.log('✔ Soil saturation back to normal. Resetting frequency to 5 minutes.');
        resetInterval();
    }

    try {
        await producer.send({
        topic,
        messages: [
            {
            value: JSON.stringify({
                type: 'soilSaturation',
                value: soilSaturation,
                region,
                timestamp: Date.now(),
            }),
            },
        ],
        });

        console.log(`✔ Sent soil saturation data to Kafka topic ${topic}`);
    } catch (error) {
        console.error(`🔴 Error sending data to Kafka topic: ${topic}\nError: `, error.message);
    }
};

// Reset interval when the frequency is adjusted
let intervalId = setInterval(simulateSoilSaturation, interval);

const resetInterval = () => {
    clearInterval(intervalId);
    intervalId = setInterval(simulateSoilSaturation, interval);
};

// Simulate data every 5 minutes
// setInterval(simulateSoilSaturation, 60000);

export default simulateSoilSaturation;
