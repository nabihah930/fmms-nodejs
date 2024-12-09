import eventEmitter from '../eventEmitter.js';

const simulateWaterLevel = () => {
  // Random water level in meters
  const waterLevel = (Math.random() * 10 + 1).toFixed(2);
  eventEmitter.emit('sensorData', {
    type: 'waterLevel',
    value: waterLevel,
    timestamp: Date.now(),
  });
};

// Simulate data every 5 minutes
setInterval(simulateWaterLevel, 60000);
export default simulateWaterLevel;
