// require express to make node server
// we do not use http as its more robust
const express = require("express");
//call express function to make server object
let app = express();
// require mongoose which is ORM Object Relational Model
const mongoose = require("mongoose");
// require package layout options in html rendering
var expressLayouts = require("express-ejs-layouts");
// publically accessible assets placed in public folder are exposed
app.use(express.static("public"));
app.use(express.static("uploads"));

// add a middleware to parse body data for form submission
app.use(express.urlencoded());

// setup view engine. ejs must be installed
app.set("view engine", "ejs");
app.use(expressLayouts);
//add as many routers as you want
// idea is to have seperate files for similar routes
let productsRouter = require("./routes/admin/products.router");
app.use(productsRouter);

// add as many routes as you want like below
//each route is distinguished according to two paramaters 1. url 2. method (http)
app.get("/contact-us", (req, res) => {
  let address = "CUI Lahore Defence Road Off Raiwind Road";
  let phone = "+92123456";
  res.render("contact-us", { address, phone });
});

app.get("/", async (req, res) => {
  let ProductModel = require("./models/product.model");
  let products = await ProductModel.find();
  res.render("home", { products });
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
