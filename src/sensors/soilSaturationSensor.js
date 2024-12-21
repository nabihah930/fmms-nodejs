// import { sendMessage } from '../kafka.js'; 

// const simulateSoilSaturation = async () => {
//     const soilSaturation = (Math.random() * 20 + 40).toFixed(2);
//     const timestamp = Date.now();

//     const message = {
//         type: 'soilSaturation',
//         value: soilSaturation,
//         timestamp: timestamp,
//     };

//     console.log('🟡 Simulated soil saturation data:', message);

//     try {
//         await sendMessage('sensor_data', message);
//         console.log('✅ Soil saturation data sent to Kafka successfully.');
//     } catch (error) {
//         console.error('🔴 Error sending soil saturation data to Kafka:', error.message);
//     }
// };

// const runSensor = () => {
//     console.log('🟢 Soil saturation sensor started. Sending data every 60 seconds...');
//     setInterval(simulateSoilSaturation, 60000); 
// };

// runSensor();

import { sendMessage } from '../kafka.js';

const simulateSoilSaturation = async () => {
    const data = {
        type: 'soilSaturation',
        value: (Math.random() * 20 + 40).toFixed(2),
        timestamp: Date.now(),
    };
    try {
        await sendMessage('sensor_data', data);
        console.log('✅ Soil saturation data sent to Kafka:', data);
    } catch (error) {
        console.error('🔴 Error sending soil saturation data:', error.message);
    }
};

setInterval(simulateSoilSaturation, 10000); // 1 message per second

