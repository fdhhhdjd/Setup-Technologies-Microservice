const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
var amqp = require("amqplib");
dotenv.config();
const connectDB = require("./db/mongo");
const REDIS = require("./db/redis");
connectDB();
var connection, channel;
async function connect_amqp() {
  connection = await amqp.connect(process.env.RABBIT_MQ);
  channel = await connection.createChannel();
  await channel.assertQueue("ORDER_PRODUCT");
}
connect_amqp().then(() => {
  channel.consume("ORDER_PRODUCT", (data) => {
    console.log("Order Product Success:::", JSON.parse(data.content));
    REDIS.publish("ordersystem", JSON.stringify(JSON.parse(data.content)));
    //delete data queue
    channel.ack(data);
  });
});
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "Tài Đẹp trai ",
    timestamp: Date.now(),
  };
  return res.send(healthcheck);
});
//!Link router Main
const transaction_route = require("./routes/transaction_routes");
app.use("/api", transaction_route);
//!Link router Main

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log(`Running on http://localhost:${PORT}`);
