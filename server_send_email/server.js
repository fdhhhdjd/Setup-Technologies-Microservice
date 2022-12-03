const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const REDIS = require("./db/redis");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
// REDIS.subscribe("ordersystem");
// REDIS.on("message", (channel, message) => {
//   console.log("Channel Send Email", channel);
//   console.log("Message Send Email", JSON.parse(message));
// });
REDIS.psubscribe("o*");
REDIS.on("pmessage", (pattern, channel, message) => {
  console.log("Pattern Send Email", pattern);
  console.log("Channel Send Email", channel);
  console.log("Message Send Email", JSON.parse(message));
});
app.get("/", async (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "Tài Đẹp trai!",
    service: `Send Email :::: ${process.env.PORT || 5003}`,
    timestamp: Date.now(),
  };
  return res.send(healthcheck);
});

//!Link router Main

const PORT = process.env.PORT || 5003;
app.listen(PORT);
console.log(`Running on http://localhost:${PORT}`);
