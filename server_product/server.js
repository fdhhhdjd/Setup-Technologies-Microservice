const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const connectDB = require("./db/mongo");
const REDIS_IO = require("./db/redis");

connectDB();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  REDIS_IO.get("server_product");
  const healthcheck = {
    uptime: process.uptime(),
    message: "Tài Đẹp trai ",
    timestamp: Date.now(),
  };
  return res.send(healthcheck);
});

//!Link router Main
const product_route = require("./routes/product_routes");
app.use("/api", product_route);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log(`Running on http://localhost:${PORT}`);
