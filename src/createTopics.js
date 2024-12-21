import { kafka } from './kafka.js';

const createTopics = async () => {
    try {
        const admin = kafka.admin();
        await admin.connect();
      
        // Example: Create topics for each sensor type and region
        const sensorTypes = ['waterLevel', 'cumulativeRainfall', 'riverFlowVelocity', 'soilSaturation', 'windSpeedDirection'];
        const regions = Array.from({ length: 750 }, (_, i) => `region_${i + 1}`);
      
        const topics = sensorTypes.flatMap(sensor =>
          regions.map(region => ({
            topic: `${region}_${sensor}`,
            numPartitions: 5, // Adjust partitions based on hardware
            replicationFactor: 1,
          }))
        );
      
        await admin.createTopics({
          topics,
        });
      
        console.log('🟢 Topics created successfully!');
    } catch (error) {
        console.log('🔴 Error creating topics:', error.message);
    } finally {
        await admin.disconnect();
    }
};

createTopics().catch(console.error);
