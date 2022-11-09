var amqp = require("amqplib");
require("dotenv").config();
var connection, channel;
async function reviveTopic() {
  try {
    connection = await amqp.connect(process.env.RABBIT_MQ);
    channel = await connection.createChannel();

    // *Create Exchange
    const nameExchange = "send_email";
    await channel.assertExchange(nameExchange, 'topic', { durable: true });

    // *Crete queue
    //* Lấy name trong queue mặc đinh "" nó sẽ tự động sinh ra name
    const {
      queue, //*name queue
    } = await channel.assertQueue('', {
      exclusive: true,
    });

    const args = process.argv.slice(2);
    if (!args.length) {
      process.exit(0);
    }
    console.log(`nameQueue:::${queue}:::::Topic::::${args}`);

    args.forEach(async (key) => {
      await channel.bindQueue(queue, nameExchange, key);
    })
    /*  *: Phù hợp với bất kì từ nào.
        #: Khớp với 1 hoặc nhiều từ bất kì.
    */
    await channel.consume(
      queue, msg => {
        console.log();
        console.log(`Msg:${msg.content.toString()}:::::Routing::::::${msg.fields.routingKey}`);
      },
    );
  } catch (error) {
    console.log(error.message);
  }
}
reviveTopic();
