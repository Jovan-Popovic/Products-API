const express = require("express");
const { json } = require("body-parser");

require("dotenv").config();

const Product = require("./controllers/product");
const User = require("./controllers/user");
const connect = require("./helpers");

const app = express();
const port = process.env.PORT || 5000;

app.use(json());

//Basic actions for users
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json(err);
  }
});

app.get("/user/:username", async (req, res) => {
  try {
    const { username } = req.params;
    console.log(username);
    const user = await User.findOne({ username });
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json(err);
  }
});

app.post("/user", async (req, res) => {
  //Route will probably be changed to /user/:username
  try {
    const { body } = req;
    const user = await User.create(body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.put("/user/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const { body } = req;
    const user = await User.findOneAndUpdate(username, body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.delete("/user/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.deleteOne(username);
    res.status(201).json(user);
  } catch (err) {
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
    res.status(404).json(err);
  }
});

app.post("/user", async (req, res) => {
  try {
    const { username, id: _id } = req.query;
    const { body } = req;
    console.log(username, _id);
    const user = await User.create({ username, _id, ...body });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.put("/user", async (req, res) => {
  try {
    const { username, id: _id } = req.query;
    const { body } = req;
    const user = await User.findOneAndUpdate(username, { ...body });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.delete("/user", async (req, res) => {
  try {
    const { username, id: _id } = req.query;
    const user = await User.deleteOne(username);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Basic actions for products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (err) {
    res.status(404).json(err);
  }
});

app.get("/product/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const product = await Product.findOne({ name });
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json(err);
  }
});

app.post("/product", async (req, res) => {
  //Route will probably be changed to /product/:name
  try {
    const { body } = req;
    const product = await Product.create(body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.put("/product/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const { body } = req;
    const product = await Product.findOneAndUpdate(name, body);
    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.delete("/product/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const product = await Product.deleteOne(name);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Additional routes and actions for products
app.get("/product_id/:_id", async (req, res) => {});

app.put("/product_id/:_id", async (req, res) => {});

app.delete("/product_id/:_id", async (req, res) => {});

app.delete("/product_dec/:_id", async (req, res) => {});

app.post("/product_inc/:_id", async (req, res) => {});

app.get("/product_num/:_id", async (req, res) => {});

app.post("/products?limit=num1&offset=num2", async (req, res) => {});

//Connecting to the database
connect(process.env.DB_URL)
  .then(() =>
    //Connecting to the server
    app.listen(port, () =>
      console.log(`Server is running on the port ${port}.`)
    )
  )
  .catch((err) => console.error("Unable to connect with the database:", err));
