import { producer } from '../kafka.js';
import { generateValue } from '../util/helpers.js';
import { isThresholdBreached } from '../thresholdEvaluator.js';
import eventEmitter from '../eventEmitter.js';

// Default: 5 minutes
let interval = 100;

const simulateWaterLevel = async () => {
  // const waterLevel = (Math.random() * 10 + 1).toFixed(2);
  const waterLevel = generateValue(
    (threshold) => (Math.random() * threshold).toFixed(2),
    (threshold) => (threshold + Math.random() * 5).toFixed(2),
    6
  );
  const region = `region${Math.floor(Math.random() * 10) + 1}`; // Random region for testing
  const topic = `${region}waterLevel`

  // Check if water level exceeds threshold
  const breached = isThresholdBreached('waterLevel', parseFloat(waterLevel));
  console.log(`\nTopic: ${topic} - Breached: ${breached}\n`);

  // Adjust frequency based on threshold breach
  if (breached && interval !== 120000) {
    interval = 120000;
    console.log('⚠ Water level threshold breached! Increasing frequency to 2 minutes.');
    eventEmitter.emit('thresholdBreached', {
      type: 'waterLevel',
      value: waterLevel,
      timestamp: Date.now(),
      region,
      message: `Water level threshold breached in ${region} on ${new Date().toISOString()}.`
    });
    
    resetInterval();
  } else if (!breached && interval !== 100) {
    interval = 100;
    console.log('✔ Water level back to normal. Resetting frequency to 5 minutes.');
    resetInterval();
  }

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
    console.error(`🔴 Error sending data to Kafka topic: ${topic}\nError: `, error.message);
  }
};

// Reset interval when the frequency is adjusted
let intervalId = setInterval(simulateWaterLevel, interval);

const resetInterval = () => {
  clearInterval(intervalId);
  intervalId = setInterval(simulateWaterLevel, interval);
};

// // Simulate data every 5 minutes
// setInterval(simulateWaterLevel, 60000);

export default simulateWaterLevel;
