import mongoose from 'mongoose';

const sensorDataSchema = new mongoose.Schema({
  type: { type: String, required: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
  timestamp: { type: Date, default: Date.now },
}, { collection: 'sensor_data' });

const SensorDataModel = mongoose.model('SensorData', sensorDataSchema);

export default SensorDataModel;
