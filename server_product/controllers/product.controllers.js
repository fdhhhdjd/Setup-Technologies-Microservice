var amqp = require("amqplib");
const Product = require("../models/product.model");
require("dotenv").config();
var connection, channel;
async function connect_amqp() {
  connection = await amqp.connect(process.env.RABBIT_MQ);
  channel = await connection.createChannel();
  await channel.assertQueue("BUY_PRODUCT");
}
connect_amqp();
const userController = {
  CreateProduct: async (req, res) => {
    const { name, description, price } = req.body;
    await Product.create({
      name,
      description,
      price,
    });
    return res.status(200).json({
      status: 200,
      success: true,
      msg: "Create Product Success !!",
    });
  },
  BuyProduct: async (req, res) => {
    const { ids } = req.body;
    if (!Array.isArray(ids)) {
      return res.status(400).json({
        status: 400,
        success: success,
        msg: "Data Fail!!",
      });
    }
    const products = await Product.find({
      _idL: { $in: ids },
    });
    channel.sendToQueue(
      "ORDER_PRODUCT",
      Buffer.from(
        JSON.stringify({
          products,
          user_id: req.user.id,
        })
      )
    );
    return res.status(200).json({
      status: 200,
      success: true,
      msg: "Buy Product success!!",
    });
  },
  GetProduct: async (req, res) => {
    return res.status(200).json({
      msg: "Server Product",
    });
  },
};
module.exports = userController;
