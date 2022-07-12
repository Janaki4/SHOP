const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  productName: {
    type: String,
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const cartModel = mongoose.model("CART", schema);

module.exports = cartModel;
