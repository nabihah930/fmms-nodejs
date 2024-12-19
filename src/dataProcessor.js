import { consumer } from './kafka.js';
import mongoose from 'mongoose';

// UserRegistration Schema and Model
const userRegistrationSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    timestamp: { type: Number, required: true },
});
const UserRegistration = mongoose.model('user_registered', userRegistrationSchema);

// SensorData Schema and Model
const sensorDataSchema = new mongoose.Schema({
    type: { type: String, required: true },
    value: { type: Number, required: true },
    timestamp: { type: Number, required: true },
});
const SensorData = mongoose.model('sensor_data', sensorDataSchema);

const processUserRegistration = async (message) => {
    try {
        console.log(`🔵 Received user registration message: ${JSON.stringify(message)}`);
        const user = new UserRegistration(message);
        await user.save();
        console.log('✅ User registration saved to MongoDB:', message);
    } catch (error) {
        console.error('🔴 Error saving user registration to MongoDB:', error.message);
    }
};

const processSensorData = async (message) => {
    try {
        console.log(`🔵 Received sensor data message: ${JSON.stringify(message)}`);
        const sensor = new SensorData(message);
        await sensor.save();
        console.log('✅ Sensor data saved to MongoDB:', message);
    } catch (error) {
        console.error('🔴 Error saving sensor data to MongoDB:', error.message);
    }
};

const runConsumer = async () => {
    try {
        console.log('🟢 Starting Kafka consumer...');
        await consumer.connect();

        await consumer.subscribe({ topic: 'user-registered', fromBeginning: true });
        await consumer.subscribe({ topic: 'sensor_data', fromBeginning: true });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const parsedMessage = JSON.parse(message.value.toString());

                if (topic === 'user-registered') {
                    await processUserRegistration(parsedMessage);
                } else if (topic === 'sensor_data') {
                    await processSensorData(parsedMessage);
                } else {
                    console.warn(`🟠 Unknown topic: ${topic}`);
                }
            },
        });

        console.log('✅ Kafka consumer is running and listening to topics...');
    } catch (error) {
        console.error('🔴 Error in Kafka consumer:', error.message);
    }
};

export default runConsumer;
