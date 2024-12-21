import { producer } from './kafka.js';

const simulateSensorLoad = async (sensorType, region) => {
  const topic = `${region}_${sensorType}`;
  const generateMessage = () => ({
    type: sensorType,
    value: (Math.random() * 100).toFixed(2), // Simulated sensor value
    region,
    timestamp: Date.now(),
  });

  const messages = Array.from({ length: 200 }, () => ({
    value: JSON.stringify(generateMessage()),
  }));

  try {
    await producer.send({
      topic,
      messages,
    });
    console.log(`✔ Sent ${messages.length} messages to Kafka ${topic}`);
  } catch (error) {
    console.error(`🔴 Error sending messages to Kafka ${topic}:`, error);
  }
};

const simulateLoad = async () => {
  const sensorTypes = ['waterLevel', 'cumulativeRainfall', 'riverFlowVelocity', 'soilSaturation', 'windSpeedDirection'];
  const regions = Array.from({ length: 750 }, (_, i) => `region_${i + 1}`);

  // Simulate all sensors
  const promises = [];
  for (const region of regions) {
    for (const sensorType of sensorTypes) {
      promises.push(simulateSensorLoad(sensorType, region));
    }
  }

  await Promise.all(promises);
  console.log('✔ Load simulation complete');
};

(async () => {
  await producer.connect();
  console.log('✔ Kafka producer connected for load simulation');
  await simulateLoad();
})();
