import { kafka } from './kafka.js';

const createTopics = async (batchSize = 100) => {
    try {
        const admin = kafka.admin();
        await admin.connect();
      
        //Create topics for each sensor type and region
        const sensorTypes = ['waterLevel', 'cumulativeRainfall', 'riverFlowVelocity', 'soilSaturation', 'windSpeedDirection'];
        const regions = Array.from({ length: 10 }, (_, i) => `region${i + 1}`);
      
        const topics = sensorTypes.flatMap(sensor =>
          regions.map(region => ({
            topic: `${region}${sensor}`,
            numPartitions: 1, // Adjust partitions based on hardware
            replicationFactor: 1,
          }))
        );

        for (let i = 0; i < topics.length; i += batchSize) {
            const batch = topics.slice(i, i + batchSize);
            await admin.createTopics({ topics: batch });
            console.log(`✔ Created ${batch.length} topics`);
        }
        
        console.log('✔✔ All Kafka Topics created successfully');
        await admin.disconnect();
    } catch (error) {
        console.log('🔴 Error creating topics:', error.message);
    }
};

export default createTopics;
