// import { sendMessage } from '../kafka.js'; 

// const simulateRainfall = async () => {
//     const cumulativeRainfall = (Math.random() * 5 + 0.1).toFixed(2);
//     const timestamp = Date.now();

//     const message = {
//         type: 'cumulativeRainfall',
//         value: cumulativeRainfall,
//         timestamp: timestamp,
//     };

//     console.log('🟡 Simulated rainfall data:', message);

//     try {
//         await sendMessage('sensor_data', message);
//         console.log('✅ Rainfall data sent to Kafka successfully.');
//     } catch (error) {
//         console.error('🔴 Error sending rainfall data to Kafka:', error.message);
//     }
// };

// const runSensor = () => {
//     console.log('🟢 Rainfall sensor started. Sending data every 60 seconds...');
//     setInterval(simulateRainfall, 60000); 
// };

// runSensor();

import { sendMessage } from '../kafka.js';

const simulateRainfall = async () => {
    const data = {
        type: 'cumulativeRainfall',
        value: (Math.random() * 5).toFixed(2),
        timestamp: Date.now(),
    };
    try {
        await sendMessage('sensor_data', data);
        console.log('✅ Rainfall data sent to Kafka:', data);
    } catch (error) {
        console.error('🔴 Error sending rainfall data:', error.message);
    }
};

setInterval(simulateRainfall, 6000); // 1 message per second


