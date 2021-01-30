const SHA256 = require("crypto-js/sha256");

const User = require("../models/user");

const findAll = () =>
  new Promise((res, rej) => {
    try {
      res(User.find().lean());
    } catch (err) {
      console.log(err);
      rej(new Error(err));
    }
  });

const findOne = (prop) =>
  new Promise((res, rej) => {
    try {
      res(User.findOne(prop));
    } catch (err) {
      console.log(err);
      rej(new Error(err));
    }
  });

const create = (user) =>
  new Promise(async (res, rej) => {
    try {
      await User.create(user);
      res(
        User.findOneAndUpdate(
          user,
          { password: SHA256(user.password) },
          { new: true, useFindAndModify: false }
        )
      );
    } catch (err) {
      console.log(err);
      rej(new Error(err));
    }
  });

const findOneAndUpdate = (filter, update) =>
  new Promise((res, rej) => {
    try {
      res(
        User.findOneAndUpdate(
          filter,
          {
            ...update,
            password: SHA256(update.password),
          },
          { new: true, useFindAndModify: false }
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
      res(User.deleteOne(filter));
    } catch (err) {
      console.log(err);
      rej(new Error(err));
    }
  });

module.exports = {
  findAll,
  findOne,
  create,
  findOneAndUpdate,
  deleteOne,
};
