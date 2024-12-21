import { producer } from '../kafka.js';
// import eventEmitter from '../eventEmitter.js';

const simulateWaterLevel = async () => {
  const waterLevel = (Math.random() * 10 + 1).toFixed(2);
  const region = `region_${Math.floor(Math.random() * 750) + 1}`; // Random region for testing
  const topic = `${region}_waterLevel`;

  try {
    await producer.send({
      topic,
      messages: [
        {
          value: JSON.stringify({
            type: 'waterLevel',
            value: waterLevel,
            region,
            timestamp: Date.now(),
          }),
        },
      ],
    });

    console.log(`✔ Sent water level data to Kafka topic ${topic}`);
  } catch (error) {
    console.error('🔴 Error sending data to Kafka topic:', error.message);
  }
};

// Simulate data every 5 minutes
setInterval(simulateWaterLevel, 60000);

export default simulateWaterLevel;
