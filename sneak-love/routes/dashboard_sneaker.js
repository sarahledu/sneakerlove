const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)

const sneakerModel = require("./../models/Sneaker");
const tagModel = require("./../models/Tag");

const uploader = require("./../config/cloudinary");

router.get("/all-sneakers", (req, res) => {
  sneakerModel
    .find()
    .populate("Tag")
    .then(dbRes => {
      res.render("products", { sneakers: dbRes, css: ["products"] });
    })
    .catch(err => console.log(err));
});

// BACKEND ROUTES

router.get("/create-product", (req, res) => {
  tagModel.find().then(dbRes => {
    res.render("products_add", { tags: dbRes });
  });
  // .catch(err => console.error(err));
});

router.post("/create-product", uploader.single("image"), (req, res) => {
  const newSneaker = {
    name: req.body.name,
    ref: req.body.ref,
    price: req.body.price,
    size: req.body.size,
    description: req.body.description,
    image: req.file.secure_url, 
    category: req.body.category,
    id_tags: req.body.tags
  };

  sneakerModel
    .create(newSneaker)
    .then(() => {
      //req.flash("success", "product successfully created");
      res.redirect("/products-manage");
    })
    .catch(dbErr => console.error(dbErr));
});

router.get("/products-manage", (req, res) => {
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

router.get("/product-edit/:id", (req, res) => {
  sneakerModel
    .findById(req.params.id)
    .populate("id_tags")
    .then(dbRes => {
      // var tagsLabel = [];
      console.log(dbRes)
       res.render("product_edit", {
              sneaker: dbRes,
              // tags: tagsLabel,
              css: ["products-manage"]
            });
      console.log(dbRes.id_tags)
      // if (dbRes.id_tags.length!==0){
      //   dbRes.id_tags.forEach(element => {
        // tagModel
        //   .findById(element)
        //   .then(tagRes => {
        //     tagsLabel.push(tagRes);
        //   })
        //   .finally(() => {
          
        //   })
        //   .catch(err => console.error(err));
      // });
      // }else {
        // res.render("product_edit", {
        //       sneaker: dbRes,
        //       css: ["products-manage"]
        //        })
      // }
      //dbRes = élément de la collection recherchée (la sneaker)
      //cet élément détient un array d'id de tag (autre collection).
      //ce qu'on souhaite à la fin est un array d'éléments de la collection Tag correspondant aux id de tag
            
    })
    .catch(dbErr => console.log(dbErr));
});

router.post("/product-edit/:id", (req, res) => {
  sneakerModel
    .findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      ref: req.body.ref,
      size: req.body.size,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category
    })
    .then(dbRes => {
      //   req.flash("success", "product successfully updated");
      res.redirect("/products-manage");
    })
    .catch(dbErr => console.error(dbErr));
});

router.get("/delete-product/:id", (req, res) => {
  sneakerModel.findByIdAndRemove(req.params.id).then(dbRes => {
    res.redirect("/products-manage");
  });
});

module.exports = router;
