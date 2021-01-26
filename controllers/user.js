const User = require("../models/user");
const jwt = require("jsonwebtoken");

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

const verifyToken = (req, res, next) => {
  const token = req.header('auth-token');
  if(!token) return res.status(401).send('Access Denided')

  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = verified.id;
    req.userRole = verified.role
    next()
  }catch(err) {
    res.status(400).send('Invaid Token');
  }
} 

module.exports = {
  findAll,
  findByUsername,
  create,
  findOneAndUpdate,
  deleteOne,
  verifyToken,
};
