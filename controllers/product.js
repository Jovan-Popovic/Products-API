const Product = require("../models/product");
const User = require("../models/user");

const findAll = (limit = 0, offset = 0) =>
  new Promise((res, rej) => {
    try {
      res(Product.find().skip(parseInt(offset)).limit(parseInt(limit)));
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
      await User.findOneAndUpdate(
        { _id: product.user },
        {
          $push: {
            product: await Product.findOne(product, ["_id"]),
          },
        }
      )
        .populate("product")
        .exec();
      res(Product.findOne(product).populate("user").exec());
    } catch (err) {
      console.log(err);
      rej(new Error(err));
    }
  });

const findOneAndUpdate = (filter, update) =>
  new Promise((res, rej) => {
    try {
      res(
        Product.findOneAndUpdate(filter, update, {
          upsert: true,
          new: true,
          useFindAndModify: false,
        })
      );
    } catch (err) {
      console.log(err);
      rej(new Error(err));
    }
  });

const deleteOne = (filter) =>
  new Promise(async (res, rej) => {
    try {
      const { user } = await Product.findOne(filter, ["user"]);
      //This line of code is not working
      await User.findOneAndUpdate(
        { _id: user },
        {
          $pull: {
            product: await Product.findOne(filter, ["_id"]),
          },
        }
      );
      res(Product.deleteOne(filter));
    } catch (err) {
      console.log(err);
      rej(new Error(err));
    }
  });

module.exports = { findAll, findOne, create, findOneAndUpdate, deleteOne };
