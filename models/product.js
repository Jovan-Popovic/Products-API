const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 15,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    minlength: 10,
    maxlength: 150,
  },
  image: {
    type: String,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png",
    //Forgot filesize prop
  },
  price: {
    type: Number,
    min: 1,
    max: 10000,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
    max: 10000,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
}).index({ name: 1 }, { unique: true });

module.exports = mongoose.model("product", productSchema);
