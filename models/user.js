const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true, //J: Needs encrytpion; A: Yes.
    },
    email: {
      type: String,
      minlength: 5,
      maxlength: 35,
      required: true,
      unique: true,
    },
    role: {
      type: Number,
      min: 0,
      max: 1,
      required: true,
      validate: {
        validator: Number.isInteger,
      },
    },
    product: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
  },
  { timestamps: true }
);

userSchema.index({ username: 1 }, { unique: true });

module.exports = mongoose.model("user", userSchema);
