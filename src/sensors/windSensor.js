import { producer } from '../kafka.js';
// import eventEmitter from '../eventEmitter.js';

const simulateWindSpeedDirection = async () => {
    const windSpeedDirection = (Math.random() * 5 + 0.1).toFixed(2);
    const region = `region${Math.floor(Math.random() * 10) + 1}`; // Random region for testing
    const topic = `${region}windSpeedDirection`;

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
        console.error('🔴 Error sending data to Kafka topic:', error.message);
    }
};

// Simulate data every 5 minutes
setInterval(simulateWindSpeedDirection, 60000);

export default simulateWindSpeedDirection;
