import { Kafka, Partitioners } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'flood-management-system',
  brokers: ['kafka:9092'], // Docker service name and port
});

const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
const consumer = kafka.consumer({ groupId: 'sensor-group' });

export { kafka, producer, consumer };
