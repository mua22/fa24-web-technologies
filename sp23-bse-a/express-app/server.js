const express = require("express");
let app = express();
const mongoose = require("mongoose");
var expressLayouts = require("express-ejs-layouts");
app.use(express.static("public"));

app.set("view engine", "ejs");
app.use(expressLayouts);
let productsRouter = require("./routes/admin/products.router");
app.use(productsRouter);
app.get("/contact-us", (req, res) => {
  let address = "CUI Lahore Defence Road Off Raiwind Road";
  let phone = "+92123456";
  res.render("contact-us", { address, phone });
});

app.get("/", (req, res) => {
  res.render("home");
});
// let connectionString =
// "mongodb+srv://musmanakram:musmanakram@cluster0.vidd3.mongodb.net/";
let connectionString = "mongodb://localhost:27017/sp23-bse-a";
mongoose
  .connect(connectionString)
  .then(() => {
    console.log(`Connected To: ${connectionString}`);
  })
  .catch((err) => {
    console.log(err.message);
  });
app.listen(5000, () => {
  console.log("Server started at localhost:5000");
});
