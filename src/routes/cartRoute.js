const express = require("express");
const app = express();
const cartRouter = new express.Router();
const prodMod = require("../modal/product");
const cartModel = require("../modal/cart");
app.use(express.json());

//taking product from product model by its ID and checking and adding it to the cart
//If the product is already in the cart , Increasing the quantity by 1
cartRouter.get("/cart/:id", async (req, res) => {
  try {
    const prod = await prodMod.findById(req.params.id);
    if (!prod) {
      return res.status(401).send("No product found on this id");
    }
    const { productName, description } = prod;

    const data = await cartModel.findOne({ productName: productName });
    if (!data) {
      const newProduct = await new cartModel({ productName, description });
      await newProduct.save();
      return res.status(201).send(newProduct);
    }
    const alreadyExistingProd = await cartModel.findOneAndUpdate(
      {
        productName: data.productName,
        description: data.description,
      },
      {
        quantity: data.quantity + 1,
      },
      { new: true }
    );
    res.status(200).send(alreadyExistingProd);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Posting a new product into the cart
//If the product is already in the cart , Increasing the quantity by 1
cartRouter.post("/cart", async (req, res) => {
  try {
    const data = await cartModel.findOne({
      productName: req.body.productName,
    });
    if (!data) {
      const newProduct = await new cartModel(req.body);
      await newProduct.save();
      return res.status(201).send(newProduct);
    }
    const alreadyExistingProd = await cartModel.findOneAndUpdate(
      {
        productName: data.productName,
        description: data.description,
      },
      {
        quantity: data.quantity + 1,
      },
      { new: true }
    );
    res.status(402).send(alreadyExistingProd);
  } catch (error) {
    res.status(500).send(error);
  }
});

//getting all  the products in the cart
cartRouter.get("/cart", async (req, res) => {
  try {
    const cartItems = await cartModel.find({});
    if (!cartItems) return req.status(400).send("Cart is empty");
    res.status(200).send(cartItems);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = cartRouter;
