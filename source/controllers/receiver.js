import amqp from "amqplib";

const queue = "produtos";

(async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    process.once("SIGINT", async () => {
      await channel.close();
      await connection.close();
    });

    await channel.assertQueue(queue, { durable: false });
    await channel.consume(
      queue,
      (message) => {
        if (message) {
          console.log(
            " [x] Produto Recebido '%s'",
            JSON.parse(message.content.toString())
          );
        }
      },
      { noAck: true }
      //noAck: true, se não receber a mensagem é excluida
    );

    console.log(" [*] Waiting for messages. To exit press CTRL+C");
  } catch (err) {
    console.warn(err);
  }
})();