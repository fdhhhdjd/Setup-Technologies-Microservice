var amqp = require("amqplib");
require("dotenv").config();
var connection, channel;
async function reviveNotify() {
  try {
    connection = await amqp.connect(process.env.RABBIT_MQ);
    channel = await connection.createChannel();

    // *Create Exchange
    const nameExchange = "video";
    await channel.assertExchange(nameExchange, "fanout", { durable: true });

    // *Crete queue
    //* Lấy name trong queue mặc đinh "" nó sẽ tự động sinh ra name
    const {
      queue, //*name queue
    } = await channel.assertQueue("", {
      exclusive: true,
    });
    console.log(`nameQueue:::${queue}`);

    //*Bingding

    await channel.bindQueue(queue, nameExchange, "");
    await channel.consume(
      queue,
      (msg) => {
        console.log(msg.content.toString());
      },
      {
        noAck: true,
      }
    );
  } catch (error) {
    console.log(error.message);
  }
}
reviveNotify();
