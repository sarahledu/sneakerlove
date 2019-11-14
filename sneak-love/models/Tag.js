const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tagSchema = new Schema({
  label: [
    "Running",
    "Basketball",
    "Lifestyle",
    "Football",
    "Skateboard",
    "Athlétisme",
    "Marche à pied",
    "Golf",
    "Tennis"
  ]
});

const tagModel = mongoose.model("Tag", tagSchema);

module.exports = tagModel;
