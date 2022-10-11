const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
dotenv.config();
const connectDB = require("./db/mongo");
connectDB();
const app = express();
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: "Request Server Many,please wait...",
});
app.use(limiter);
app.use(express.json());
app.use(cors());

app.get("/api", async (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "Tài Đẹp trai ",
    timestamp: Date.now(),
  };
  return res.send(healthcheck);
});

//!Link router Main
const user_route = require("./routes/user_routes");
app.use("/", user_route);

const PORT = process.env.PORT || 5002;
app.listen(PORT);
console.log(`Running on http://localhost:${PORT}`);
