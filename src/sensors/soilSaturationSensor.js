import { producer } from '../kafka.js';
// import eventEmitter from '../eventEmitter.js';

const simulateSoilSaturation = async () => {
    const soilSaturation = (Math.random() * 20 + 40).toFixed(2);
    const region = `region${Math.floor(Math.random() * 10) + 1}`; // Random region for testing
    const topic = `${region}soilSaturation`;

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
        console.error('🔴 Error sending data to Kafka topic:', error.message);
    }
};

// Simulate data every 5 minutes
setInterval(simulateSoilSaturation, 60000);

export default simulateSoilSaturation;
