const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Schema =  mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    min:5
  
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.generateToken = async function () {
  let token = jwt.sign({ _id: this._id }, process.env.SECRATE);
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
