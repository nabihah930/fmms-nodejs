import express from 'express';
import { sendMessage } from './kafka.js';

const app = express();
app.use(express.json());

app.post('/register', async (req, res) => {
    const { username, email, timestamp } = req.body;

    try {
        console.log('🔵 Received registration data:', req.body);
        await sendMessage('user-registered', { username, email, timestamp });
        console.log('✅ Message sent to Kafka.');

        res.status(200).json({ status: 'success', message: 'Message sent.' });
    } catch (error) {
        console.error('🔴 Failed to process registration:', error.message);
        res.status(500).json({ status: 'error', message: 'Failed to send message.' });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
