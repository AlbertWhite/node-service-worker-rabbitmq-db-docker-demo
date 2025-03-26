import express, { Request, Response } from 'express';
import amqp from 'amqplib';

const queue = 'demo_event_queue';

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect('amqp://guest:guest@rabbitmq:5672');
    const channel = await connection.createChannel();
    console.log('=====================');
    console.log('Connected to RabbitMQ');
    console.log('=====================');

    await channel.assertQueue(queue, { durable: true });

    return channel;
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
}

async function sendRabbitMQEvent({
  channel,
  queue,
  message,
}: {
  channel: amqp.Channel;
  queue: string;
  message: string;
}) {
  channel.sendToQueue(queue, Buffer.from(message));
  console.log('Message sent:', message);
}

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Event producer server is setup');
});

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`);

  const channel = await connectRabbitMQ();

  if (channel) {
    await sendRabbitMQEvent({
      channel,
      queue,
      message: 'Hello from event producer',
    });
  }
});
