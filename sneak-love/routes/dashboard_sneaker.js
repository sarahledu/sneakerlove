const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)

const sneakerModel = require("./../models/Sneaker");
const tagModel = require("./../models/Tag");

router.get("/all-sneakers", (req, res) => {
  sneakerModel
    .find()
    .populate("tag")
    .then(dbRes => {
      res.render("products", { sneakers: dbRes, css: ["products"] });
    })
    .catch(err => console.log(err));
});

// BACKEND ROUTES

router.get("/create-product", (req, res) => {
  sneakerModel.find().then(dbRes => {
    res.render("products_add", { sneakers: dbRes });
  });
});

router.post("/create-product", (req, res) => {
  const newSneaker = {
    name: req.body.name,
    ref: req.body.ref,
    price: req.body.price,
    category: req.body.category
  };

  sneakerModel
    .create(newSneaker)
    .then(() => {
      req.flash("success", "sneaker successfully created");
      res.redirect("products_manage");
    })
    .catch(dbErr => console.error(dbErr));
});

router.get("/manage-products", (req, res) => {
  sneakerModel
    .find()
    .populate("tag")
    .then(dbRes => {
      res.render("products_manage", {
        sneakers: dbRes,
        css: ["products-manage"]
      });
    });
});

router.get("/edit-sneaker/:id", (req, res) => {
  sneakerModel
    .findById(req.params.id)
    .populate("tag")
    .then(dbRes => {
      sneakerModel.find().then(tags => {
        res.render("product-edit", {
          artist: dbRes,
          styles: styles,
          css: ["artist"]
        });
      });
    })
    .catch(dbErr => console.log(dbErr));
});

router.post("/edit-artist/:id", (req, res) => {
  sneakerModel
    .findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      style: req.body.style,
      isBand: Boolean(Number(req.body.isBand)),
      description: req.body.description
    })
    .then(dbRes => {
      req.flash("success", "artist successfully updated");
      res.redirect("/manage-artists");
    })
    .catch(dbErr => console.error(dbErr));
});

router.get("/delete-artist/:id", (req, res) => {
  sneakerModel.findByIdAndRemove(req.params.id).then(dbRes => {
    req.flash("success", "artist successfully deleted");
    res.redirect("/manage-artists");
  });
});

module.exports = router;
