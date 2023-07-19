import amqp from "amqplib";

const compra = [
    { id: "1",  itemDado: "32 esmeraldas",  itemComprado: "1 espada", profissão: "Armorer"},
    { id: "2",  itemDado: "5 esmeraldas",  itemComprado: "1 pão", profissão: "Farmer"},
    { id: "3",  itemDado: "25 esmeraldas",  itemComprado: "1 picareta", profissão: "Armorer"}
];

(async () => {
  let connection;
  try {
    connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const exchangeName = 'exchange_compras';
    for(var i = 0; i < 3; i++){
        console.log(compra[i].profissão)
        const routingKey = compra[i].profissão;
        await  channel.assertExchange(exchangeName, 'direct', {durable: false});
        channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(compra[i])));
        console.log(" [x] Enviando '%s'", compra[i]);
    } 

    await channel.close();
  } catch (err) {
    console.warn(err);
  } finally {
    if (connection) await connection.close();
  }
})();