const IOREDIS = require("ioredis");
require("dotenv").config()
const { REDIS_PORT, REDIS_HOST,REDIS_USER,REDIS_PASSWORD } = process.env;
const REDIS = new IOREDIS({
  port: REDIS_PORT,
  host: REDIS_HOST,
  user: REDIS_USER,
  password: REDIS_PASSWORD,
});

REDIS.on("connect", () => {
  console.log("Client connected to redis Push...");
});
REDIS.on("ready", () => {
  console.log("Client connected to redis push and ready to use...");
});
REDIS.on("error", (error) => {
  console.log("fail");
});
REDIS.on("end", () => {
  console.log("Client disconnected from redis push");
});
REDIS.on("SIGINT", () => {
  REDIS.quit();
});

module.exports = REDIS;
