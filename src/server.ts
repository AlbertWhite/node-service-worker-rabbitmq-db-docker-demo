import express, { Request, Response } from 'express';
import amqp from 'amqplib';

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect('amqp://guest:guest@rabbitmq:5672');
    const channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
    // Further setup for queues, exchanges, etc.
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
}

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!!!');
});

app.listen(port, () => {
  connectRabbitMQ();
  console.log(`Example app listening at http://localhost:${port}`);
});
