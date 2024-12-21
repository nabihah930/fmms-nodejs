// import mongoose from 'mongoose';

// const sensorDataSchema = new mongoose.Schema({
//     type: { type: String, required: true },
//     value: { type: Number, required: true },
//     timestamp: { type: Number, required: true },
// });

// const SensorData = mongoose.model('sensor_data', sensorDataSchema);
// export default SensorData;
import mongoose from 'mongoose';

const sensorDataSchema = new mongoose.Schema({
    type: { type: String, required: true },
    value: { type: String, required: true },
    timestamp: { type: Number, required: true },
});

const SensorData = mongoose.model('SensorData', sensorDataSchema);

export default SensorData;
