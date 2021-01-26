const Product = require("../models/product");

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
  new Promise((res, rej) => {
    try {
      res(Product.create(product).populate("user").exec());
    } catch (err) {
      console.log(err);
      rej(new Error(err));
    }
  });

const findOneAndUpdate = (name, body) =>
  new Promise((res, rej) => {
    try {
      res(
        res(
          Product.findOneAndUpdate(
            { name },
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

const deleteOne = (name) =>
  new Promise((res, rej) => {
    try {
      res(Product.deleteOne({ name }));
    } catch (err) {
      console.log(err);
      rej(new Error(err));
    }
  });

module.exports = { findAll, findOne, create, findOneAndUpdate, deleteOne };
