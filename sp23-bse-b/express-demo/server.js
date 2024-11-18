const express = require("express");
const mongoose = require("mongoose");
var expressLayouts = require("express-ejs-layouts");
let server = express();
server.set("view engine", "ejs");
server.use(expressLayouts);
server.use(express.static("public"));
server.use(express.urlencoded());

let adminProductsRouter = require("./routes/admin/products.controller");
server.use(adminProductsRouter);

server.get("/about-me", (req, res) => {
  return res.render("about-me");
});
server.get("/", (req, res) => {
  return res.send(res.render("homepage"));
});
// let connectionString =
//   "mongodb+srv://musmanakram:musmanakram123@cluster0.vidd3.mongodb.net/";
let connectionString = "mongodb://localhost/sp23-bse-b";
mongoose
  .connect(connectionString, { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo DB Server: " + connectionString))
  .catch((error) => console.log(error.message));
server.listen(5000, () => {
  console.log(`Server Started at localhost:5000`);
});
