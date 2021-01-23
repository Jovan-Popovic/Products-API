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

const findByName = (name) =>
  new Promise((res, rej) => {
    try {
      res(Product.findOne({ name }));
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

const findOneAndUpdate = (product, update) =>
  new Promise((res, rej) => {
    try {
      res(Product.findOneAndUpdate(product, update));
    } catch (err) {
      console.log(err);
      rej(new Error(err));
    }
  });

const deleteOne = (id) =>
  new Promise((res, rej) => {
    try {
      res(Product.deleteOne({ _id: id }));
    } catch (err) {
      console.log(err);
      rej(new Error(err));
    }
  });

module.exports = { findAll, findByName, create, findOneAndUpdate, deleteOne };
