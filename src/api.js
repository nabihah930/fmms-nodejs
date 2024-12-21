import express from 'express';
import connectToDatabase from './db.js';

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON requests

// Fetch all sensor readings
app.get('/api/sensor-data', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('sensor_readings');
    const data = await collection.find({}).toArray();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    res.status(500).json({ message: 'Error fetching sensor data' });
  }
});

// System health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'System is running', timestamp: new Date().toISOString() });
});

// System health check
app.get('/', (req, res) => {
  res.status(200).json({ message: 'System is running', timestamp: new Date().toISOString() });
});

// Start the server
const startApiServer = () => {
  app.listen(PORT, () => {
    console.log(`API server running at http://localhost:${PORT}`);
  });
};

export default startApiServer;
