// import express from 'express';
// import mongoose from 'mongoose';
// import processSensorData from './dataProcessor.js';
// import { sendMessage } from './kafka.js';

// const app = express();
// app.use(express.json());

// const MONGODB_URL = 'mongodb://mongo:27017/flood_management';
// mongoose.connect(MONGODB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log('✅ MongoDB connected successfully.'))
//     .catch((error) => console.error('🔴 MongoDB connection error:', error.message));

// // Route for sending data
// // app.post('/register', async (req, res) => {
// //     const { username, email, timestamp } = req.body;
// //     console.log('🔵 Received registration data:', req.body);

// //     try {
// //         await sendMessage('user-registered', { username, email, timestamp });
// //         res.status(200).json({ status: 'success', message: 'Message sent successfully.' });
// //     } catch (error) {
// //         console.error('🔴 Error sending Kafka message:', error.message);
// //         res.status(500).json({ status: 'error', message: 'Failed to send message.' });
// //     }
// // });

// app.get('/api/sensor-data', async (req, res) => {
//     try {
//         const data = await SensorData.find({});
//         res.json(data);
//     } catch (error) {
//         console.error('🔴 Error fetching sensor data:', error.message);
//         res.status(500).send('Error fetching data');
//     }
// });

// // Route to handle user registration
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

// // Start the Kafka consumer
// processSensorData();

// const PORT = 3000;
// app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
