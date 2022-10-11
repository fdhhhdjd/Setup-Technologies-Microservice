const express = require("express");
const dotenv = require("dotenv");
const gateway = require("fast-gateway");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const requestIp = require("request-ip");
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());

const server = gateway({
  middlewares: [
    (req, res, next) => {
      req.ip = requestIp.getClientIp(req);
      return next();
    },
    rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minutes
      max: 60,
      handler: (req, res) =>
        res.send("Too many requests, please try again later.", 429),
    }),
  ],
  routes: [
    {
      prefix: "/products",
      target: `${process.env.SERVICE_PRODUCTS}`,
      proxyConfig: {
        region: `${process.env.REGION_SERVICE}`,
      },
    },
    {
      prefix: "/transactions",
      target: `${process.env.SERVICE_TRANSACTION}`,
      proxyConfig: {
        region: `${process.env.REGION_SERVICE}`,
      },
    },
    {
      prefix: "/users",
      target: `${process.env.SERVICE_USERS}`,
      proxyConfig: {
        region: `${process.env.REGION_SERVICE}`,
      },
    },
  ],
});

server.start(process.env.PORT || 8080);
console.log(`Running on http://localhost:${process.env.PORT}`);
