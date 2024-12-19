import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'fmms',
    brokers: ['kafka:9092'], 
});

const producer = kafka.producer();

export const sendMessage = async (topic, message) => {
    try {
        console.log('🔵 Connecting Kafka producer...');
        await producer.connect();
        console.log('✅ Kafka producer connected.');

        console.log(`🔵 Sending message to topic '${topic}':`, message);
        await producer.send({
            topic,
            messages: [{ value: JSON.stringify(message) }],
        });

        console.log('✅ Message sent successfully.');
    } catch (error) {
        console.error('🔴 Error sending message:', error.message);
    } finally {
        await producer.disconnect();
    }
};

// Consumer setup
export const consumer = kafka.consumer({ groupId: 'fmms-group' });

export const startConsumer = async (topic, processMessage) => {
    try {
        console.log(`🔵 Starting Kafka consumer for topic '${topic}'...`);
        await consumer.connect();
        await consumer.subscribe({ topic, fromBeginning: true });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const parsedMessage = JSON.parse(message.value.toString());
                console.log(`🔵 Received message from '${topic}':`, parsedMessage);
                await processMessage(parsedMessage);
            },
        });
    } catch (error) {
        console.error('🔴 Error in Kafka consumer:', error.message);
    }
};
