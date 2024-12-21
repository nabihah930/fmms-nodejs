// import express from 'express';
// import mongoose from 'mongoose';
// import { sendMessage } from './src/kafka.js';
// import processUserRegistration from './src/dataProcessor.js'; // Import the consumer function
// import SensorData from './src/models/SensorDataModel.js';

// const app = express();
// app.use(express.json());

// mongoose.connect('mongodb://mongodb:27017/flood_management', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => console.log('✅ MongoDB connected.'))
// .catch(err => console.error('🔴 MongoDB connection error:', err.message));

// // Endpoint for sending user registration data to Kafka
// app.post('/register', async (req, res) => {
//     const { username, email, timestamp } = req.body;

//     try {
//         console.log('🔵 Received registration data:', req.body);
//         await sendMessage('user-registered', { username, email, timestamp });
//         res.status(200).json({ status: 'success', message: 'Message sent.' });
//     } catch (error) {
//         console.error('🔴 Failed to process registration:', error.message);
//         res.status(500).json({ status: 'error', message: 'Failed to send message.' });
//     }
// });

// app.get('/sensors', async (req, res) => {
//     try {
//         const data = await SensorData.find({});
//         res.status(200).json(data);
//     } catch (error) {
//         console.error('🔴 Error fetching sensor data:', error.message);
//         res.status(500).json({ error: 'Failed to fetch sensor data.' });
//     }
// });

// // Start Kafka Consumer
// processUserRegistration(); // Start the consumer to listen and process Kafka messages

// // Start Express Server
// const PORT = 3000;
// app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));

// -------------
// import express from 'express';
// import mongoose from 'mongoose';
// import runConsumer from './src/dataProcessor.js';
// import { sendMessage } from './src/kafka.js';

// const app = express();
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://mongodb:27017/flood_management', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => console.log('✅ MongoDB connected.'))
// .catch(err => console.error('🔴 MongoDB connection error:', err.message));

// // Endpoint for user registration
// app.post('/register', async (req, res) => {
//     const { username, email, timestamp } = req.body;

//     try {
//         console.log('🔵 Received registration data:', req.body);
//         await sendMessage('user-registered', { username, email, timestamp });
//         res.status(200).json({ status: 'success', message: 'Message sent.' });
//     } catch (error) {
//         console.error('🔴 Failed to send user registration:', error.message);
//         res.status(500).json({ status: 'error', message: 'Failed to send message.' });
//     }
// });

// // Start Kafka Consumer to process user registrations and sensor data
// runConsumer();

// const PORT = 3000;
// app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));

// import express from 'express';
// import mongoose from 'mongoose';
// import { connectDB } from './db.js';
// import { startConsumer } from './kafka.js';
// import processSensorData from './dataProcessor.js';

// const app = express();
// app.use(express.json());

// connectDB(); // Connect to MongoDB

// // API to fetch sensor data
// app.get('/api/sensor-data', async (req, res) => {
//     try {
//         const SensorData = mongoose.model('SensorData');
//         const data = await SensorData.find({});
//         res.json(data);
//     } catch (error) {
//         console.error('Error fetching sensor data:', error.message);
//         res.status(500).send('Error fetching data');
//     }
// });

// // Start Kafka consumer
// startConsumer('sensor_data', processSensorData);

// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`✅ Server running on http://localhost:${PORT}`);
// });

import express from 'express';
import mongoose from 'mongoose';
import processSensorData from './src/dataProcessor.js';
import connectDB from './src/db.js';

const app = express();
app.use(express.json());

await connectDB();
//const MONGODB_URL = 'mongodb://mongo:27017/flood_management';

// // Connect to MongoDB
// mongoose.connect(MONGODB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log('✅ MongoDB connected successfully.'))
//     .catch((error) => console.error('🔴 MongoDB connection error:', error.message));

// Start the Kafka consumer for sensor data
processSensorData();

// Example route to fetch all sensor data
app.get('/api/sensor-data', async (req, res) => {
    try {
        const SensorData = mongoose.model('SensorData');
        const data = await SensorData.find({});
        res.json(data);
    } catch (error) {
        console.error('🔴 Error fetching sensor data:', error.message);
        res.status(500).send('Error fetching data');
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
