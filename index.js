import connectToDatabase from './src/db.js';
import startApiServer from './src/api.js';
import './src/createTopics.js'
import startConsumer from './src/dataProcessor.js';
import { producer } from './src/kafka.js';
import './src/sensors/waterLevelSensor.js';
import './src/sensors/riverFlowSensor.js';
import './src/sensors/rainfallSensor.js';
import './src/sensors/soilSaturationSensor.js';
import './src/sensors/windSensor.js';
import './src/dataProcessor.js'; // Import to activate the event listener

(async () => {
  await connectToDatabase(); // Ensure DB is connected
  console.log('✔ Database connected');

  await producer.connect();
  console.log('✔ Kafka producer connected');

  await startConsumer();
  console.log('✔ Kafka consumer running');

  console.log('✔ All sensors running');
  startApiServer();
})();
