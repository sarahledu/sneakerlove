const express = require("express");
const router = new express.Router();
const userModel = require("../models/User");
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", (req, res, next) => {
  const name = req.body.name;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  if (name === "" || password === "" || lastname === "" || email === "") {
    res.render("signup", {
      msg: "Indicate a username and a password to sign up"
    });
    return;
  }
  userModel
    .findOne({
      email: email
    })
    .then(user => {
      if (user !== null) {
        res.render("signup", {
          msg: "The email already exists!"
        });
        return;
      }
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
      user.password = hashed;

      //console.log(req.body);
      userModel
        .create({
          name,
          lastname,
          email,
          password: hashPass
        })
        .then(userRes => {
          res.render("signup", { user: userRes });
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      next(error);
    });
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

module.exports = router;
