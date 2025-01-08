import connectToDatabase from './src/db.js';
import startApiServer from './src/api.js';
import createTopics from './src/createTopics.js';
import startConsumer from './src/dataProcessor.js';
import { producer } from './src/kafka.js';
import './src/sensors/waterLevelSensor.js';
import './src/sensors/riverFlowSensor.js';
import './src/sensors/rainfallSensor.js';
import './src/sensors/soilSaturationSensor.js';
import './src/sensors/windSensor.js';

(async () => {
    try {
        await connectToDatabase();
        await createTopics();
        await producer.connect();
        await startConsumer();
        console.log('✔ All sensors running');
        startApiServer();
    } catch(error) {
        console.log(`‼ Error Running App:`, error.message);
    }
})();
