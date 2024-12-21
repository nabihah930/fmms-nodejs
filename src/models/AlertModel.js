import mongoose from 'mongoose';

// Maybe message too?
const alertSchema = new mongoose.Schema({
  type: { type: String, required: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
  timestamp: { type: Date, default: Date.now },
  region: { type: String, required: true },
  resolved: { type: mongoose.Schema.Types.Boolean, default: false }
}, { collection: 'alerts' });

const AlertModel = mongoose.model('Alerts', alertSchema);

export default AlertModel;
