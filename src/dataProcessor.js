import { consumer } from './kafka.js';
import SensorDataModel from './models/SensorDataModel.js';
// import eventEmitter from './eventEmitter.js';
// import SensorDataModel from './models/SensorDataModel.js'; // MongoDB model

// eventEmitter.on('sensorData', async (data) => {
//     console.log(`\nReceived data from ${data.type}: `, data);
//     try {
//         const sensorData = new SensorDataModel(data);
//         await sensorData.save();
//         console.log(`Saved ${data.type} data to database.`);
//     } catch (error) {
//         console.error('🔴 Error saving data:', error);
//     }
// });


const startConsumer = async () => {
  await consumer.connect();
  const sensorTypes = ['waterLevel', 'cumulativeRainfall', 'riverFlowVelocity', 'soilSaturation', 'windSpeedDirection'];
  const regions = Array.from({ length: 750 }, (_, i) => `region_${i + 1}`);

  const topics = sensorTypes.flatMap(sensor =>
    regions.map(region => `${region}_${sensor}`)
  );

  await consumer.subscribe({ topics });

  await consumer.run({
    eachBatch: async ({ batch }) => {
      const sensorDataBatch = batch.messages.map(({ value }) => JSON.parse(value.toString()));

      try {
        await SensorDataModel.insertMany(sensorDataBatch, { ordered: false });
        console.log(`✔ Batch of ${sensorDataBatch.length} messages inserted in MongoDB.`);
      } catch (error) {
        console.error('🔴 Error inserting message batch in MongoDB:', error.message);
      }
    },
  });
};

export default startConsumer;
