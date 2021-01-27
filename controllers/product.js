const Product = require("../models/product");
const User = require("../models/user");

const findAll = () =>
  new Promise((res, rej) => {
    try {
      res(Product.find().lean());
    } catch (err) {
      console.log(err);
      rej(new Error(err));
    }
  });

const findOne = (prop) =>
  new Promise((res, rej) => {
    try {
      res(Product.findOne(prop));
    } catch (err) {
      console.log(err);
      rej(new Error(err));
    }
  });

const create = (product) =>
  new Promise(async (res, rej) => {
    try {
      await Product.create(product);
      await User.findOne(product.id).populate("product").exec(); //Not finished, should populate product array of the user document
      res(Product.findOne(product).populate("user").exec());
    } catch (err) {
      console.log(err);
      rej(new Error(err));
    }
  });

const findOneAndUpdate = (filter, body) =>
  new Promise((res, rej) => {
    try {
      res(
        res(
          Product.findOneAndUpdate(
            filter,
            { $set: body },
            {
              upsert: true,
              new: true,
              useFindAndModify: false,
            }
          )
        )
      );
    } catch (err) {
      console.log(err);
      rej(new Error(err));
    }
  });

const deleteOne = (filter) =>
  new Promise((res, rej) => {
    try {
      res(Product.deleteOne(filter));
    } catch (err) {
      console.log(err);
      rej(new Error(err));
    }
  });

module.exports = { findAll, findOne, create, findOneAndUpdate, deleteOne };
