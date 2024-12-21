import { consumer } from './kafka.js';
import SensorDataModel from './models/SensorDataModel.js';

const startConsumer = async () => {
    try {
        await consumer.connect();
        const sensorTypes = ['waterLevel', 'cumulativeRainfall', 'riverFlowVelocity', 'soilSaturation', 'windSpeedDirection'];
        const regions = Array.from({ length: 10 }, (_, i) => `region${i + 1}`);
        
        const topics = sensorTypes.flatMap(sensor =>
            regions.map(region => `${region}${sensor}`)
        );
        
        try {
            await consumer.subscribe({ topics });
        } catch (error) {
            console.error('🔴 Error subscribing to Kafka topics:', error.message);
            throw error;
        }
        
        await consumer.run({
            eachBatch: async ({ batch }) => {
                const sensorDataBatch = batch.messages.map(({ value }) => JSON.parse(value.toString()));
                console.log(`\n\nSensor Data Batch: `, sensorDataBatch);
                try {
                    await SensorDataModel.insertMany(sensorDataBatch, { ordered: false });
                    console.log(`✔ Batch of ${sensorDataBatch.length} messages inserted in MongoDB.`);
                } catch (error) {
                    console.error('🔴 Error inserting message batch in MongoDB:', error.message);
                    throw error;
                }
            },
        });

        console.log(`✔ Kafka consumer running`);
    } catch (error) {
        console.error('🔴 Error:', error.message);
    }
};

export default startConsumer;
