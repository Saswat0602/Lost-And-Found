const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

const itemSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  question: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  itemPictures: [ImageSchema],
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
