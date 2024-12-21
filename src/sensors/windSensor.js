// import { sendMessage } from '../kafka.js'; 

// const simulateWindSpeedDirection = async () => {
//     // Random wind speed & direction in km/h
//     const windSpeedDirection = (Math.random() * 5 + 0.1).toFixed(2);
//     const timestamp = Date.now();

//     const message = {
//         type: 'windSpeedDirection',
//         value: windSpeedDirection,
//         timestamp: timestamp,
//     };

//     console.log('🟡 Simulated wind speed data:', message);

//     try {
//         await sendMessage('sensor_data', message);
//         console.log('✅ Wind speed data sent to Kafka successfully.');
//     } catch (error) {
//         console.error('🔴 Error sending wind speed data to Kafka:', error.message);
//     }
// };

// const runSensor = () => {
//     console.log('🟢 Wind speed sensor started. Sending data every 60 seconds...');
//     setInterval(simulateWindSpeedDirection, 60000); 
// };

// runSensor();

import { sendMessage } from '../kafka.js';

const simulateWindSpeedDirection = async () => {
    const data = {
        type: 'windSpeedDirection',
        value: (Math.random() * 5 + 0.1).toFixed(2),
        timestamp: Date.now(),
    };
    try {
        await sendMessage('sensor_data', data);
        console.log('✅ Wind speed data sent to Kafka:', data);
    } catch (error) {
        console.error('🔴 Error sending wind speed data:', error.message);
    }
};

setInterval(simulateWindSpeedDirection, 1000); // 1 message per second
