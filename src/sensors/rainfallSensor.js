import eventEmitter from '../eventEmitter.js';

const simulateRainfall = () => {
    // Random rainfall in millimetres
    const cumulativeRainfall = (Math.random() * 5 + 0.1).toFixed(2);
    eventEmitter.emit('sensorData', {
        type: 'cumulativeRainfall',
        value: cumulativeRainfall,
        timestamp: Date.now(),
    });
};

setInterval(simulateRainfall, 60000);
export default simulateRainfall;
