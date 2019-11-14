const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)

const sneakerModel = require("./../models/Sneaker");
const tagModel = require("./../models/Tag");

router.get("/all-sneakers", (req, res) => {
  sneakerModel
    .find()
    // .populate("tag")
    .then(dbRes => {
      res.render("products", { sneakers: dbRes, css: ["products"] });
    })
    .catch(err => console.log(err));
});

module.exports = router;
