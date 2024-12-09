import eventEmitter from './eventEmitter.js';
import SensorDataModel from './models/SensorDataModel.js'; // MongoDB model

eventEmitter.on('sensorData', async (data) => {
    console.log(`\nReceived data from ${data.type}: `, data);
    try {
        const sensorData = new SensorDataModel(data);
        await sensorData.save();
        console.log(`Saved ${data.type} data to database.`);
    } catch (error) {
        console.error('🔴 Error saving data:', error);
    }
});
