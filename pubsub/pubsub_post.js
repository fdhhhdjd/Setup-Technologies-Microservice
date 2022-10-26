var amqp = require("amqplib");
require("dotenv").config();
var connection, channel;
async function connect_amqp() {
  try {
    connection = await amqp.connect(process.env.RABBIT_MQ);
    channel = await connection.createChannel();

    // Create Exchange
    const nameExchange = "video";
    await channel.assertExchange(nameExchange, "fanout", { durable: true });
    //* '' tham số không muốn bất kì hàng đợi nao cụ thể
    await channel.publish(nameExchange, "", Buffer.from(msg));
    console.log(`[x] Send OK:::::${msg}`);
    setTimeout(function () {
      connection.close();
      process.exit(0);
    }, 2000);
  } catch (error) {
    console.log(error.message);
  }
}
const msg = process.argv.slice(2).join(" ") || "Hello Exchange";
connect_amqp({ msg });
