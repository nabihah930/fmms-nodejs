import eventEmitter from '../eventEmitter.js';

const simulateSoilSaturation = () => {
    // Random soil saturation percentage
    const soilSaturation = (Math.random() * 20 + 40).toFixed(2);
    eventEmitter.emit('sensorData', {
        type: 'soilSaturation',
        value: soilSaturation,
        timestamp: Date.now(),
    });
};

setInterval(simulateSoilSaturation, 60000);
export default simulateSoilSaturation;
