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

const findByUsername = (username) =>
  new Promise((res, rej) => {
    try {
      res(User.findOne({ username }));
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

const findOneAndUpdate = (username, update) =>
  new Promise((res, rej) => {
    try {
      res(
        User.findOneAndUpdate({ username }, update, {
          // upsert: true,
          new: true,
          useFindAndModify: false,
        })
      );
    } catch (err) {
      console.log(err);
      rej(new Error(err));
    }
  });

const deleteOne = (username) =>
  new Promise((res, rej) => {
    try {
      res(User.deleteOne({ username }));
    } catch (err) {
      console.log(err);
      rej(new Error(err));
    }
  });

module.exports = {
  findAll,
  findByUsername,
  create,
  findOneAndUpdate,
  deleteOne,
};
