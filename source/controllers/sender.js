import amqp from "amqplib";

const queue = "produtos";

const produto = {
  id: "123",
  nome: "X-Burguer",
  descrição: "Pão, hamburguer, queijo",
  Quantidade: 1,
};

(async () => {
  let connection;
  try {
    connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(produto)));
    console.log(" [x] Enviando '%s'", produto);
    await channel.close();
  } catch (err) {
    console.warn(err);
  } finally {
    if (connection) await connection.close();
  }
})();