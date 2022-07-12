const express = require("express");
require("./db/mongoose");
const productRoute = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use(productRoute);
app.use(cartRoute);

app.listen(port, () => {
  console.log("Working"), port;
});
