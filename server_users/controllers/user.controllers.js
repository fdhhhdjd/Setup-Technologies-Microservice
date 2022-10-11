const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/users.model");
const userController = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;
      const passwordHash = await bcrypt.hash(password, 10);
      await Users.create({ email, password: passwordHash });
      return res.status(200).json({
        status: 200,
        success: true,
        msg: "Register success!!!",
      });
    } catch (error) {
      console.log(error);
    }
  },
  Login: async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user)
      return res.status(400).json({
        status: 400,
        success: false,
        msg: "User does not exist.",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        status: 400,
        success: false,
        msg: "Incorrect password.",
      });
    const accessToken = createAccessToken({ id: user._id });
    const refreshToken = createRefreshToken({ id: user._id });
    return res.status(200).json({
      status: 200,
      success: true,
      msg: {
        accessToken,
        refreshToken,
      },
    });
  },
  getUSer: async (req, res) => {
    return res.status(200).json({
      msg: "Server Users!",
    });
  },
};
const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
};
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};
module.exports = userController;
