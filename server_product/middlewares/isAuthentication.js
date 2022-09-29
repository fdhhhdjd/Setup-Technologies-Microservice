const jwt = require("jsonwebtoken");
const isAuthentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token)
      return res.status(400).json({
        status: 400,
        success: false,
        msg: "Invalid Authentication",
      });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err)
        return res.status(400).json({
          status: 400,
          success: false,
          msg: "Token Fail",
        });

      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      success: false,
      msg: error,
    });
  }
};
module.exports = isAuthentication;
