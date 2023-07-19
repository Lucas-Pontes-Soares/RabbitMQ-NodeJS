import amqp from "amqplib";

(async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const exchangeName = 'exchange_compras';
    const queueName = 'fila_armorer';
    const routingKey = 'Armorer';

    process.once("SIGINT", async () => {
      await channel.close();
      await connection.close();
    });

    await channel.assertExchange(exchangeName, 'direct', { durable: false });
    const queue = await channel.assertQueue(queueName, { exclusive: true });

    channel.bindQueue(queue.queue, exchangeName, routingKey);
    
    channel.consume(queue.queue, (message) => {
        if (message.content) {
          console.log(' [x] Produto Recebido:', message.content.toString());
        }
      }, { noAck: true });

    console.log(" [*] Waiting for messages. To exit press CTRL+C");
  } catch (err) {
    console.warn(err);
  }
})();