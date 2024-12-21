// import { consumer } from './kafka.js';
// import mongoose from 'mongoose';

// // UserRegistration Schema and Model
// const userRegistrationSchema = new mongoose.Schema({
//     username: { type: String, required: true },
//     email: { type: String, required: true },
//     timestamp: { type: Number, required: true },
// });
// const UserRegistration = mongoose.model('user_registered', userRegistrationSchema);

// // SensorData Schema and Model
// const sensorDataSchema = new mongoose.Schema({
//     type: { type: String, required: true },
//     value: { type: Number, required: true },
//     timestamp: { type: Number, required: true },
// });
// const SensorData = mongoose.model('sensor_data', sensorDataSchema);

// const processUserRegistration = async (message) => {
//     try {
//         console.log(`🔵 Received user registration message: ${JSON.stringify(message)}`);
//         const user = new UserRegistration(message);
//         await user.save();
//         console.log('✅ User registration saved to MongoDB:', message);
//     } catch (error) {
//         console.error('🔴 Error saving user registration to MongoDB:', error.message);
//     }
// };

// const processSensorData = async () => {
//     try {
//         console.log('🔵 Starting Kafka consumer for sensor data...');
//         await consumer.subscribe({ topic: 'sensor_data', fromBeginning: true });

//         await consumer.run({
//             eachMessage: async ({ topic, partition, message }) => {
//                 const parsedMessage = JSON.parse(message.value.toString());
//                 console.log(`🔵 Received sensor data: ${JSON.stringify(parsedMessage)}`);

//                 try {
//                     // Save the sensor data to MongoDB
//                     const sensorData = new SensorData(parsedMessage);
//                     await sensorData.save();
//                     console.log('✅ Sensor data saved to MongoDB:', parsedMessage);
//                 } catch (dbError) {
//                     console.error('🔴 Error saving sensor data to MongoDB:', dbError.message);
//                 }
//             },
//         });
//     } catch (error) {
//         console.error('🔴 Error in Kafka consumer:', error.message);
//     }
// };

// const processSensorData = async () => {
//     try {
//         console.log('🔵 Starting Kafka consumer for sensor data...');
//         await consumer.subscribe({ topic: 'soil_saturation', fromBeginning: true });
//         await consumer.subscribe({ topic: 'rainfall', fromBeginning: true });
//         await consumer.subscribe({ topic: 'river_flow', fromBeginning: true });

//         await consumer.run({
//             eachMessage: async ({ topic, partition, message }) => {
//                 const parsedMessage = JSON.parse(message.value.toString());
//                 console.log(`🔵 Received message from ${topic}:`, parsedMessage);

//                 try {
//                     const sensorData = new SensorData(parsedMessage);
//                     await sensorData.save();
//                     console.log('✅ Sensor data saved to MongoDB:', parsedMessage);
//                 } catch (dbError) {
//                     console.error('🔴 Error saving sensor data to MongoDB:', dbError.message);
//                 }
//             },
//         });
//     } catch (error) {
//         console.error('🔴 Error in Kafka consumer:', error.message);
//     }
// };

//-------

// import SensorData from './models/SensorDataModel.js';

// const processSensorData = async () => {
//     try {
//         console.log('🔵 Starting Kafka consumer for sensor data...');
//         await consumer.subscribe({ topic: 'sensor_data', fromBeginning: true });

//         await consumer.run({
//             eachMessage: async ({ topic, partition, message }) => {
//                 const parsedMessage = JSON.parse(message.value.toString());
//                 console.log(`🔵 Received message: ${JSON.stringify(parsedMessage)}`);

//                 try {
//                     const sensorData = new SensorData(parsedMessage);
//                     await sensorData.save();
//                     console.log('✅ Sensor data saved to MongoDB:', parsedMessage);
//                 } catch (dbError) {
//                     console.error('🔴 Error saving sensor data to MongoDB:', dbError.message);
//                 }
//             },
//         });
//     } catch (error) {
//         console.error('🔴 Error in Kafka consumer:', error.message);
//     }
// };



// const saveRainfallData = async (data) => {
//     // Example MongoDB save logic for rainfall
//     try {
//         const Rainfall = mongoose.model('rainfall_data', yourRainfallSchema);
//         await new Rainfall(data).save();
//         console.log('✅ Rainfall data saved to MongoDB:', data);
//     } catch (error) {
//         console.error('🔴 Error saving rainfall data:', error.message);
//     }
// };

// const saveSoilData = async (data) => {
//     // Example MongoDB save logic for soil saturation
//     try {
//         const SoilData = mongoose.model('soil_data', yourSoilSchema);
//         await new SoilData(data).save();
//         console.log('✅ Soil saturation data saved to MongoDB:', data);
//     } catch (error) {
//         console.error('🔴 Error saving soil data:', error.message);
//     }
// };


// const runConsumer = async () => {
//     try {
//         console.log('🟢 Starting Kafka consumer...');
//         await consumer.connect();

//         //await consumer.subscribe({ topic: 'user-registered', fromBeginning: true });
//         await consumer.subscribe({ topic: 'sensor_data', fromBeginning: true });

//         await consumer.run({
//             eachMessage: async ({ topic, partition, message }) => {
//                 const parsedMessage = JSON.parse(message.value.toString());

//                 if (topic === 'user-registered') {
//                     await processUserRegistration(parsedMessage);
//                 } else if (topic === 'sensor_data') {
//                     await processSensorData(parsedMessage);
//                 } else {
//                     console.warn(`🟠 Unknown topic: ${topic}`);
//                 }
//             },
//         });

//         console.log('✅ Kafka consumer is running and listening to topics...');
//     } catch (error) {
//         console.error('🔴 Error in Kafka consumer:', error.message);
//     }
// };

// export default runConsumer;

import { consumer }  from './kafka.js';
import SensorData from './models/SensorDataModel.js';

const processSensorData = async () => {
    try {
        console.log('🔵 Starting Kafka consumer for sensor data...');
        await consumer.subscribe({ topic: 'sensor_data', fromBeginning: true });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const parsedMessage = JSON.parse(message.value.toString());
                console.log('🔵 Received message:', parsedMessage);

                try {
                    const sensorData = new SensorData(parsedMessage);
                    await sensorData.save();
                    console.log('✅ Saved to MongoDB:', parsedMessage);
                } catch (dbError) {
                    console.error('🔴 Error saving to MongoDB:', dbError.message);
                }
            },
        });
    } catch (error) {
        console.error('🔴 Error in Kafka consumer:', error.message);
    }
};

export default processSensorData;


