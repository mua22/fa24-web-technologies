const express = require("express");
let router = express.Router();
let Product = require("../../models/product.model");
router.get("/admin/dashboard", (req, res) => {
  res.render("admin/dashboard", { layout: "admin/admin-layout" });
});
router.get("/admin/products/delete/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  return res.redirect("back");
});
router.get("/admin/products/edit/:id", async (req, res) => {
  let product = await Product.findById(req.params.id);
  return res.render("admin/product-edit-form", {
    product,
    layout: "admin/admin-layout",
  });
});
router.post("/admin/products/edit/:id", async (req, res) => {
  let product = await Product.findById(req.params.id);
  product.title = req.body.title;
  product.description = req.body.description;
  product.price = req.body.price;
  product.isFeatured = Boolean(req.body.isFeatured);
  await product.save();
  return res.redirect("/admin/products");
});

router.get("/admin/products/create", (req, res) => {
  // if (req.query.title) return res.send(req.query);
  // res.send("This is products creat page");
  res.render("admin/product-form", { layout: "admin/admin-layout" });
});
router.post("/admin/products/create", async (req, res) => {
  let newProduct = new Product(req.body);
  newProduct.isFeatured = Boolean(req.body.isFeatured);
  await newProduct.save();
  // return res.send(newProduct);
  return res.redirect("/admin/products");
});
router.get("/admin/products", async (req, res) => {
  let products = await Product.find();
  res.render("admin/products", { layout: "admin/admin-layout", products });
});
module.exports = router;
