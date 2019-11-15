const express = require("express");
const router = express.Router();
const sneakerModel = require("../models/Sneaker");
const tagModel = require("../models/Tag");

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

router.get("/all-sneakers", (req, res) => {
  // const label = [];
  tagModel
    .find()
    .then(dbRes => res.render("products", { tags: dbRes }))
    .catch(err => console.log(err));
});

router.get("/sneakers/women", (req, res) => {
  // const label = [];
  tagModel
    .find()
    .then(dbRes => res.render("products", { tags: dbRes }))
    .catch(err => console.log(err));
});

module.exports = router;
