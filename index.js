// import registerUser from "./src/userRegistration.js";
import connectToDatabase from './src/db.js';
import startApiServer from './src/api.js';
import './src/sensors/waterLevelSensor.js';
import './src/sensors/riverFlowSensor.js';
import './src/sensors/rainfallSensor.js';
import './src/sensors/soilSaturationSensor.js';
import './src/sensors/windSensor.js';
import './src/dataProcessor.js'; // Import to activate the event listener

(async () => {
    // registerUser('John Doe', 'john.doe@gmail.com');
    await connectToDatabase(); // Ensure DB is connected before starting
    console.log(`✔ All sensors running`);
    startApiServer();
})();