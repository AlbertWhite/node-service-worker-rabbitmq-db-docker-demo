import amqp from 'amqplib';

const queue = 'demo_event_queue';

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect('amqp://guest:guest@rabbitmq:5672');
    const channel = await connection.createChannel();

    // Ensure the queue exists
    await channel.assertQueue(queue, { durable: true });

    console.log('Waiting for messages in queue:', queue);

    // Consume messages from the queue
    channel.consume(queue, (message) => {
      if (message) {
        const content = message.content.toString();
        console.log(`Received message: ${content}`);
        // Acknowledge the message
        channel.ack(message);
      }
    });
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
}

connectRabbitMQ();
