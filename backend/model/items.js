import mongoose from "mongoose";

const { Schema } = mongoose;

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
  imgUri: {
    type: [String],
    required: true,
  },
  thumbnailUrl: {
    type: [String],
    required: true,
  },
  // allResponse: {
  //   type: [String],
  //   default: [],
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
