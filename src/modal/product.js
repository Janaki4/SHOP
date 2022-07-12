const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  //   _id: {
  //     type: String,
  //   },
  productName: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
});

const productModal = mongoose.model("Product", schema);

module.exports = productModal;
