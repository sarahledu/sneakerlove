const express = require("express");
const router = express.Router();
const sneakerModel = require("../models/Sneaker");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/:cat", (req, res) => {
  const category = req.params.cat;
  sneakerModel
    .find({ category: category })
    .then(dbRes => res.render("products", { sneakers: dbRes }))
    .catch(err => console.log(err));
});

router.get("/one-product/:id", (req, res) => {
  sneakerModel
    .findById(req.params.id)
    .then(dbRes => res.render("one_product", { sneaker: dbRes }))
    .catch(err => console.log(err));
});

module.exports = router;
