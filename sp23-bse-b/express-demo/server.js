// Require Express which is light weight framework of node for web servers
const express = require("express");
// mongoose is ORM (Object Relational Model) for mongodb
const mongoose = require("mongoose");

// require a package for layout support
var expressLayouts = require("express-ejs-layouts");
// make an express server object by calling express function
let server = express();

let cookieParser = require("cookie-parser");
server.use(cookieParser());

let session = require("express-session");
server.use(session({ secret: "my session secret" }));

// setup ejs as view engine

server.set("view engine", "ejs");
// add middleware for layouts
server.use(expressLayouts);

//expose public folder for publically accessible static files
server.use(express.static("public"));
server.use(express.static("uploads"));
// add support for fetching data from request body
server.use(express.urlencoded());

// make as manu routers (mini express applications) as you want and add them to express
let adminProductsRouter = require("./routes/admin/products.controller");
server.use(adminProductsRouter);

// add as many routes as you want
server.get("/about-me", (req, res) => {
  return res.render("about-me");
});
server.get("/", async (req, res) => {
  let Product = require("./models/product.model");
  let products = await Product.find();
  return res.render("homepage", { products });
});
// let connectionString =
//   "mongodb+srv://musmanakram:musmanakram123@cluster0.vidd3.mongodb.net/";
// connect your mongoose by giving connection string
let connectionString = "mongodb://localhost/sp23-bse-b";
mongoose
  .connect(connectionString, { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo DB Server: " + connectionString))
  .catch((error) => console.log(error.message));
// fire up the server software at port
server.listen(5000, () => {
  console.log(`Server Started at localhost:5000`);
});
