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
    const user = await User.findByUsername(username);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json(err);
  }
});

app.post("/user", async (req, res) => {
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
    const currentUser = await User.findByUsername(username);
    const { body: update } = req;
    const updatedUser = await User.findOneAndUpdate(currentUser, update);
    res.status(201).json(updatedUser);
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
app.get("/user?username=val1&id=val2", async (req, res) => {});

//Basic actions for products
app.get("/products", async (req, res) => {});

app.get("/product/:name", async (req, res) => {});

app.post("/product/:username", async (req, res) => {
  try {
    const { body } = req;
    const user = await User.findByUsername(body.user); //Not finished
    const product = await Product.create(body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.put("/product/:name", async (req, res) => {});

app.delete("/product/:name", async (req, res) => {});

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
