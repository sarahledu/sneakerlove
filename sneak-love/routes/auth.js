const express = require("express");
const router = new express.Router();
const userModel = require("../models/User");
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup-user", (req, res, next) => {
  const name = req.body.name;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.string;

  console.log(req.body);

  if (username === "" || password === "") {
    res.git("signup", {
      msg: "Indicate a username and a password to sign up"
    });
    return;
  }
  userModel
    .findOne({
      name: name,
      lastname: lastname,
      email: email,
      password: password
    })
    .then(user => {
      if (user !== null) {
        res.render("signup", {
          msg: "The username already exists!"
        });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

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
  res.send("love");
});

module.exports = router;
