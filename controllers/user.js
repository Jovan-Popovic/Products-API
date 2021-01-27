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
  new Promise((res, rej) => {
    try {
      res(User.create(user));
    } catch (err) {
      console.log(err);
      rej(new Error(err));
    }
  });

const findOneAndUpdate = (filter, body) =>
  new Promise((res, rej) => {
    try {
      res(
        User.findOneAndUpdate(
          filter,
          { $set: body },
          {
            upsert: true,
            new: true,
            useFindAndModify: false,
          }
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
