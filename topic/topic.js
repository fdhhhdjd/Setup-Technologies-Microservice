var amqp = require("amqplib");
require("dotenv").config();
var connection, channel;
async function sendEmail() {
    try {
        connection = await amqp.connect(process.env.RABBIT_MQ);
        channel = await connection.createChannel();

        // *Create Exchange
        const nameExchange = "send_email";
        await channel.assertExchange(nameExchange, 'topic', { durable: true });

        const args = process.argv.slice(2);
        const msg = args[1] || 'Fixed !!'
        const topic = args[0];

        console.log(`msg::::${msg}::::Topic::::${topic}`)


        await channel.publish(nameExchange, topic, Buffer.from(msg));

        console.log(`[x] Send OK:::::${msg}`);

        setTimeout(function() {
            connection.close();
            process.exit(0);
        }, 2000);
    } catch (error) {
        console.log(error.message);
    }
}
sendEmail();
