const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const connectDB = require("./db/mongo");

connectDB();
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
const user_route = require("./routes/user_routes");
app.use("/api", user_route);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log(`Running on http://localhost:${PORT}`);
