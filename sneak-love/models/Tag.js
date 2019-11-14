const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tagSchema = new Schema({
  label: ["running", "basketball"]
  }
});

const tagModel = mongoose.model("Tag", tagSchema);

module.exports = tagModel;