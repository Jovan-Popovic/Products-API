const express = require("express");
const crypto = require('crypto');
const { json } = require("body-parser");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const Product = require("./controllers/product");
const User = require("./controllers/user");
const connect = require("./helpers");

const app = express();
const port = process.env.PORT || 5000;

app.use(json());

//Basic actions for users
app.get("/users", User.verifyToken, async (req, res) => {
  if(req.userRole == 1){//Is user admin
    const users = await User.findAll();
    res.status(200).json(users);
  }
  else {//else
    res.status(400).json({ "error": "Access Denided :)" })
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

app.post("/singup", async (req, res) => {
  try {
    const body = req.body;
    if(body.password.length < 5) {//I'm looking to see if the password is longer than 5
      let err = { "error": "The password can't be shorter than the minimum allowed length (5)." };
      res.status(400).json(err);
    }
    else if(body.password.length > 25){//I'm looking to see if the password is shorter than 5
      let err = { "error": "The password can't be longer than the maximum allowed length (25)." };
      res.status(400).json(err);
    }
    else {//If everything is ok then I encrypt the password
      const cryptoPass = crypto.createHash('sha256').update(body.password).digest('base64');
      body.password = cryptoPass;
      body.role = 0;
      const user = await User.create(body);
      res.status(201).json(user);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

app.post("/login", async (req, res) => {
  const body = req.body;
  const userFind = await User.findByUsername(body.username);
  if(userFind){ //does user exist
    let userPass = userFind.password;
    userPass = userPass.toString();
    let enterPass = crypto.createHash('sha256').update(body.password).digest('base64');
    enterPass = enterPass.toString();
    if(enterPass == userPass) {//compare password with if :)
      //create and save (_id and username) in token
      const id = userFind._id;
      const role = userFind.role
      const token = jwt.sign({ id, role }, process.env.ACCESS_TOKEN_SECRET)
      res.header('auth-token', token).send(token);
    }
    else {
      console.log(userFind.password)
      res.status(400).json({ "error": "Password is incorect!" })
    }
  }
  else {
    res.status(400).json({ "error": "User does not exist" })
  }
})

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
app.get("/products", User.verifyToken, async (req, res) => {});

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
