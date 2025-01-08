import { producer } from '../kafka.js';
import { generateValue } from '../util/helpers.js';
import { isThresholdBreached } from '../thresholdEvaluator.js';
import eventEmitter from '../eventEmitter.js';

// Default: 5 minutes
let interval = 100;

const simulateWindSpeedDirection = async () => {
    // const windSpeedDirection = (Math.random() * 5 + 0.1).toFixed(2);
    const windSpeedDirection = generateValue(
        (threshold) => (Math.random() * 5 + 0.1).toFixed(2),
        (threshold) => (threshold + Math.random() * 5).toFixed(2),
        70
    );
    const region = `region${Math.floor(Math.random() * 10) + 1}`; // Random region for testing
    const topic = `${region}windSpeedDirection`;

    // Check if wind speed exceeds the threshold
    const breached = isThresholdBreached('windSpeedDirection', parseFloat(windSpeedDirection));
    console.log(`\nTopic: ${topic} - Breached: ${breached}\n`);

    // Adjust frequency based on threshold breach
    if (breached && interval !== 120000) {
        interval = 120000;
        console.log('⚠ Wind speed threshold breached! Increasing frequency to 2 minutes.');
        eventEmitter.emit('thresholdBreached', {
            type: 'windSpeedDirection',
            value: windSpeedDirection,
            timestamp: Date.now(),
            region,
            message: `Wind speed threshold breached in ${region} on ${new Date().toISOString()}.`
        });

        resetInterval();
    } else if (!breached && interval !== 100) {
        interval = 100;
        console.log('✔ Wind speed back to normal. Resetting frequency to 5 minutes.');
        resetInterval();
    }

    try {
        await producer.send({
            topic,
            messages: [
                {
                    value: JSON.stringify({
                        type: 'windSpeedDirection',
                        value: windSpeedDirection,
                        region,
                        timestamp: Date.now(),
                    }),
                },
            ],
        });

        console.log(`✔ Sent wind speed data to Kafka topic ${topic}`);
    } catch (error) {
        console.error(`🔴 Error sending data to Kafka topic: ${topic}\nError: `, error.message);
    }
};

// Reset interval when the frequency is adjusted
let intervalId = setInterval(simulateWindSpeedDirection, interval);

const resetInterval = () => {
    clearInterval(intervalId);
    intervalId = setInterval(simulateWindSpeedDirection, interval);
};

// Simulate data every 5 minutes
// setInterval(simulateWindSpeedDirection, 60000);

export default simulateWindSpeedDirection;
