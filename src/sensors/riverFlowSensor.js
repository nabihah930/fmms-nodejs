import eventEmitter from '../eventEmitter.js';

const simulateRiverFlow = () => {
    // Random velocity in m/s
    const riverFlowVelocity = (Math.random() * 5 + 0.1).toFixed(2);
    eventEmitter.emit('sensorData', {
        type: 'riverFlowVelocity',
        value: riverFlowVelocity,
        timestamp: Date.now(),
    });
};

setInterval(simulateRiverFlow, 60000);
export default simulateRiverFlow;
