const express = require("express");
const { json } = require("body-parser");

require("dotenv").config();

const Product = require("./controllers/product");
const User = require("./controllers/user");
const { connect } = require("./helpers");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(json());

//Root route
app.get("/", (req, res) => {
  try {
    const data = {
      title: "Welcome to products API",
      description:
        "This is a simple REST API, created for the purpose of excercising with ExpressJS and MongoDB.",
      note: "If you want to get access to the routes, you will need a JWT!",
    };
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//Basic actions for users
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

app.get("/user/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

app.post("/user/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const { body } = req;
    const user = await User.create({ username, ...body });
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.put("/user/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const { body } = req;
    const user = await User.findOneAndUpdate({ username }, body);
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.delete("/user/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.deleteOne({ username });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//Additional routes and actions for products
app.get("/user", async (req, res) => {
  try {
    const { username, id: _id } = req.query;
    const user = await User.findOne({ username, _id });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

app.post("/user", async (req, res) => {
  try {
    const { username, id: _id } = req.query;
    const { body } = req;
    const user = await User.create({ username, _id, ...body });
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.put("/user", async (req, res) => {
  try {
    const { username, id: _id } = req.query;
    const { body } = req;
    const user = await User.findOneAndUpdate({ username, _id }, { $set: body });
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.delete("/user", async (req, res) => {
  try {
    const { username, id: _id } = req.query;
    const user = await User.deleteOne({ username, _id });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//Basic actions for products
app.get("/products", async (req, res) => {
  try {
    const { limit, offset } = req.query;
    const products = await Product.findAll(limit, offset);
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

app.get("/product/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const product = await Product.findOne({ name });
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

app.post("/product/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const { body } = req;
    const product = await Product.create({ name, ...body });
    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.put("/product/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const { body } = req;
    const product = await Product.findOneAndUpdate({ name }, { $set: body });
    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.delete("/product/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const product = await Product.deleteOne({ name });
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//Additional routes and actions for products
app.get("/product_id/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const product = await Product.findOne({ _id });
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

app.put("/product_id/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const { body } = req;
    const product = await Product.findOneAndUpdate({ _id }, { $set: body });
    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.delete("/product_id/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const product = await Product.deleteOne({ _id });
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.put("/product_dec/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const product = await Product.findOneAndUpdate(
      { _id },
      { $inc: { quantity: -1 } }
    );
    res.status(200).json({ quantity: product.quantity });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.put("/product_inc/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const product = await Product.findOneAndUpdate(
      { _id },
      { $inc: { quantity: 1 } }
    );
    res.status(201).json({ quantity: product.quantity });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.get("/product_num/:_id", async (req, res) => {
  try {
    //Not sure if it works as it should
    const { _id } = req.params;
    const product = await Product.findOne({ _id });
    res.status(200).json({ quantity: product.quantity });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//Connecting to the database
connect(process.env.DB_URL)
  .then(() =>
    //Connecting to the server
    app.listen(PORT, () =>
      console.log(`Server is running on the port ${PORT}.`)
    )
  )
  .catch((err) => console.error("Unable to connect with the database:", err));
