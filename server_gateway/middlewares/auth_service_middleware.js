const registry = require("../routes/registry.json");
const auth_gateway_middleware = (req, res, next) => {
  const url = req.protocol + "://" + req.hostname + process.env.PORT + req.path;
  const authString = req.headers;
  const username = authString.username;
  const password = authString.password;
  const user = registry.auth.users[username];
  if (user) {
    if (user.username === username && user.password === password) {
      next();
    } else {
      res.send({
        authenticated: false,
        path: url,
        message: "Authentication Unsuccessful: Incorrect password.",
      });
    }
  } else {
    res.send({
      authenticated: false,
      path: url,
      message:
        "Authentication Unsuccessful: User " + username + " does not exist.",
    });
  }
};
module.exports = auth_gateway_middleware;
