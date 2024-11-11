const express = require("express");
var expressLayouts = require("express-ejs-layouts");
let server = express();
server.set("view engine", "ejs");
server.use(expressLayouts);
server.use(express.static("public"));
server.get("/about-me", (req, res) => {
  return res.render("about-me");
});
server.get("/", (req, res) => {
  return res.send(res.render("homepage"));
});
server.listen(5000, () => {
  console.log(`Server Started at localhost:5000`);
});
