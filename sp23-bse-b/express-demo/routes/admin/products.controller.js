const express = require("express");
let router = express.Router();
let Product = require("../../models/product.model");
router.get("/admin/products/create", (req, res) => {
  return res.render("admin/product-form", { layout: "adminlayout" });
});

router.post("/admin/products/create", async (req, res) => {
  let data = req.body;
  let newProduct = new Product(data);
  newProduct.title = data.title;
  await newProduct.save();
  return res.redirect("/admin/products");
  // we will send data to model to save in db

  // return res.send(newProduct);
  // return res.render("admin/product-form", { layout: "adminlayout" });
});

router.get("/admin/products", async (req, res) => {
  let products = await Product.find();
  return res.render("admin/products", {
    layout: "adminlayout",
    pageTitle: "Manage Your Products",
    products,
  });
});

module.exports = router;
