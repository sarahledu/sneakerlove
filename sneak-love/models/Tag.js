const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tagSchema = new Schema({
  label: ["Running", "Basketball", "Lifestyle", "Football", "Skateboard", "Athlétisme"]
  
});

const tagModel = mongoose.model("Tag", tagSchema);

module.exports = tagModel;