const express = require("express");
const router = new express.Router();


router.get("/signup", (req, res) => {
    res.send("sneak");
  });
  
  router.get("/signin", (req, res) => {
    res.send("love");
  });
  
module.exports = router;
