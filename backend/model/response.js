import mongoose from "mongoose";

const { Schema } = mongoose;

const responseSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  responseBack: {
    type: String,
    required: true,
  },
  confirmation: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Response = mongoose.model("Response", responseSchema);

export default Response;
