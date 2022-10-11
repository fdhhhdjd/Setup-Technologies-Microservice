const express = require("express");
const app = express();
const helmet = require("helmet");
const PORT = 8080;
const routes = require("./routes/gateway.route");
app.use(express.json());
app.use(helmet());
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Gateway has started on port + http:localhost:${PORT}`);
});
