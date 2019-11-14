const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sneakerSchema = new Schema({
  name: String,
  ref: String,
  price: Number,
  category: ["men", "women", "kids"],
  id_tags: [ObjectId]
});

const sneakerModel = mongoose.model("Sneaker", sneakerSchema);

module.exports = sneakerModel;
