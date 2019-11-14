const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/:cat", (req, res) => {
  res.render("bar");
});

router.get("/one-product/:id", (req, res) => {
  res.render("baz");
});

module.exports = router;
