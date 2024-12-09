import eventEmitter from '../eventEmitter.js';

const simulateWindSpeedDirection = () => {
    // Random wind speed & direction in km/h
    const windSpeedDirection = (Math.random() * 5 + 0.1).toFixed(2);
    eventEmitter.emit('sensorData', {
        type: 'windSpeedDirection',
        value: windSpeedDirection,
        timestamp: Date.now(),
    });
};

setInterval(simulateWindSpeedDirection, 60000);
export default simulateWindSpeedDirection;
