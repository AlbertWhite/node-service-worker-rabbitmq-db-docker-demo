import amqp from 'amqplib';
import { Client } from 'pg';
import { v4 as uuidv4 } from 'uuid';

const queue = 'demo_event_queue';

const databaseClient = new Client({
  host: 'postgres', // Use the service name defined in docker-compose.yml
  port: 5432,
  user: 'myuser',
  password: 'mypassword',
  database: 'mydatabase',
});

async function connectPostgres() {
  try {
    await databaseClient.connect();
    console.log('Connected to PostgreSQL');
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
  }
}

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect('amqp://guest:guest@rabbitmq:5672');
    const channel = await connection.createChannel();

    // Ensure the queue exists
    await channel.assertQueue(queue, { durable: true });

    console.log('Waiting for messages in queue:', queue);

    // Consume messages from the queue
    channel.consume(queue, async (message) => {
      if (message) {
        const content = message.content.toString();
        console.log(`Received message: ${content}`);
        // Acknowledge the message
        channel.ack(message);

        const query =
          'INSERT INTO message (message_uuid, message) VALUES ($1, $2)';
        const values = [uuidv4(), content];
        await databaseClient.query(query, values);
        console.log('Message written to database');
      }
    });
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
}

(async () => {
  await connectPostgres();
  await connectRabbitMQ();
})();
