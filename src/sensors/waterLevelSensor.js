// import { sendMessage } from '../kafka.js'; 

// const simulateWaterLevel = async () => {
//     const waterLevel = (Math.random() * 10 + 1).toFixed(2);
//     const timestamp = Date.now();

//     const message = {
//         type: 'waterLevel',
//         value: waterLevel,
//         timestamp: timestamp,
//     };

//     console.log('🟡 Simulated water level data:', message);

//     try {
//         await sendMessage('sensor_data', message);
//         console.log('✅ Water level data sent to Kafka successfully.');
//     } catch (error) {
//         console.error('🔴 Error sending water level data to Kafka:', error.message);
//     }
// };

// const runSensor = () => {
//     console.log('🟢 Water level sensor started. Sending data every 60 seconds...');
//     setInterval(simulateWaterLevel, 60000); 
// };

// runSensor();

import { sendMessage } from '../kafka.js';

const simulateWaterLevel = async () => {
    const data = {
        type: 'waterLevel',
        value: (Math.random() * 10 + 1).toFixed(2),
        timestamp: Date.now(),
    };
    try {
        await sendMessage('sensor_data', data);
        console.log('✅ Water level data sent to Kafka:', data);
    } catch (error) {
        console.error('🔴 Error sending water level data:', error.message);
    }
};

setInterval(simulateWaterLevel, 1000); // 1 message per second
