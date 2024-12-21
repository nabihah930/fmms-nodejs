// import { sendMessage } from '../kafka.js'; 

// const simulateRiverFlow = async () => {
//     const riverFlowVelocity = (Math.random() * 5 + 0.1).toFixed(2);
//     const timestamp = Date.now();

//     const message = {
//         type: 'riverFlowVelocity',
//         value: riverFlowVelocity,
//         timestamp: timestamp,
//     };

//     console.log('🟡 Simulated riverflow data:', message);

//     try {
//         await sendMessage('sensor_data', message);
//         console.log('✅ Riverflow data sent to Kafka successfully.');
//     } catch (error) {
//         console.error('🔴 Error sending riverflow data to Kafka:', error.message);
//     }
// };

// const runSensor = () => {
//     console.log('🟢 Riverflow sensor started. Sending data every 60 seconds...');
//     setInterval(simulateRiverFlow, 60000); 
// };

// runSensor();


import { sendMessage } from '../kafka.js';

const simulateRiverflow = async () => {
    const data = {
        type: 'riverFlowVelocity',
        value: (Math.random() * 5 + 0.1).toFixed(2),
        timestamp: Date.now(),
    };
    try {
        await sendMessage('sensor_data', data);
        console.log('✅ Riverflow data sent to Kafka:', data);
    } catch (error) {
        console.error('🔴 Error sending riverflow data:', error.message);
    }
};

setInterval(simulateRiverflow, 1000); // 1 message per second

