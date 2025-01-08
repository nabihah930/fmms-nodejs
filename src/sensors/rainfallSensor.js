import { producer } from '../kafka.js';
// import eventEmitter from '../eventEmitter.js';

const simulateRainfall = async () => {
    const cumulativeRainfall = (Math.random() * 5 + 0.1).toFixed(2);
    const region = `region${Math.floor(Math.random() * 10) + 1}`; // Random region for testing
    const topic = `${region}cumulativeRainfall`;

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
        console.error('🔴 Error sending data to Kafka topic:', error.message);
    }
};

// Simulate data every 5 minutes
setInterval(simulateRainfall, 100);

export default simulateRainfall;
