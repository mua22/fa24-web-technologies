// Require Express which is light weight framework of node for web servers
const express = require("express");
// mongoose is ORM (Object Relational Model) for mongodb
const mongoose = require("mongoose");

// require a package for layout support
var expressLayouts = require("express-ejs-layouts");
// make an express server object by calling express function
let server = express();
let Product = require("./models/product.model");
let User = require("./models/user.model");
let cookieParser = require("cookie-parser");
server.use(cookieParser());

let session = require("express-session");
server.use(session({ secret: "my session secret" }));

let siteMiddleware = require("./middlewares/site-middleware");
let authMiddleware = require("./middlewares/auth-middleware");
server.use(siteMiddleware);
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

// add as many routes as you want
server.get("/about-me", authMiddleware, (req, res) => {
  return res.render("about-me");
});
server.get("/logout", async (req, res) => {
  req.session.user = null;
  return res.redirect("/login");
});
server.get("/login", async (req, res) => {
  return res.render("auth/login");
});
server.post("/login", async (req, res) => {
  let data = req.body;
  let user = await User.findOne({ email: data.email });
  if (!user) return res.redirect("/register");
  isValid = user.password == data.password;
  if (!isValid) return res.redirect("/login");
  req.session.user = user;
  return res.redirect("/");
});
server.get("/register", async (req, res) => {
  return res.render("auth/register");
});
server.post("/register", async (req, res) => {
  let data = req.body;
  let user = await User.findOne({ email: data.email });
  if (user) return res.redirect("/register");
  user = new User(data);
  await user.save();
  return res.redirect("/login");
});
server.get("/cart", async (req, res) => {
  let cart = req.cookies.cart;
  cart = cart ? cart : [];
  let products = await Product.find({ _id: { $in: cart } });
  return res.render("cart", { products });
});
server.get("/add-to-cart/:id", (req, res) => {
  let cart = req.cookies.cart;
  cart = cart ? cart : [];
  cart.push(req.params.id);
  res.cookie("cart", cart);
  return res.redirect("/");
});

server.get("/", async (req, res) => {
  let products = await Product.find();
  return res.render("homepage", { products });
});
// let connectionString =
//   "mongodb+srv://musmanakram:musmanakram123@cluster0.vidd3.mongodb.net/";
// connect your mongoose by giving connection string
let adminMiddleware = require("./middlewares/admin-middleware");
server.use("/", authMiddleware, adminMiddleware, adminProductsRouter);

let connectionString = "mongodb://localhost/sp23-bse-b";
mongoose
  .connect(connectionString, { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo DB Server: " + connectionString))
  .catch((error) => console.log(error.message));
// fire up the server software at port
server.listen(5000, () => {
  console.log(`Server Started at localhost:5000`);
});
