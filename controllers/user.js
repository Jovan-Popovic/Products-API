const User = require("../models/product");

const findAll = () =>
  new Promise((res, rej) => {
    try {
      res(User.find().lean().exec());
    } catch (err) {
      console.log(err);
      rej(new Error(err));
    }
  });

const findById = (id) =>
  new Promise((res, rej) => {
    try {
      res(User.findById(id).exec());
    } catch (err) {
      console.log(err);
      rej(new Error(err));
    }
  });

const create = (user) =>
  new Promise((res, rej) => {
    try {
      res(User.create(user));
    } catch (err) {
      console.log(err);
      rej(new Error(err));
    }
  });

const findOneAndUpdate = (user, update) =>
  new Promise((res, rej) => {
    try {
      res(User.findOneAndUpdate(user, update).exec());
    } catch (err) {
      console.log(err);
      rej(new Error(err));
    }
  });

const deleteOne = (id) =>
  new Promise((res, rej) => {
    try {
      res(User.deleteOne({ _id: id }).exec());
    } catch (err) {
      console.log(err);
      rej(new Error(err));
    }
  });

module.exports = { findAll, findById, create, findOneAndUpdate, deleteOne };
