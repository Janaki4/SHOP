const express = require("express");
const app = express();
const router = new express.Router();
const prodMod = require("../modal/product");
app.use(express.json());
const cartModel = require("../modal/cart");

router.post("/product", async (req, res) => {
  try {
    const prod = new prodMod(req.body);
    await prod.save();
    res.status(201).send(prod);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/product", async (req, res) => {
  try {
    const prodList = await prodMod.find();
    await res.status(200).send(prodList);
  } catch (error) {
    res.status(401).send(error);
  }
});

module.exports = router;
