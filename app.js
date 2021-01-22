const express = require("express");
const { json } = require("body-parser");

require("dotenv").config();

const Product = require("./controllers/product");
const User = require("./controllers/user");
const connect = require("./helpers");

const app = express();
const port = process.env.PORT || 5000;

app.use(json());

//Basic actions for products
app.get("/products", async (req, res) => {});

app.get("/product/:name", async (req, res) => {});

app.post("/product/:name", async (req, res) => {});

app.put("/product/:name", async (req, res) => {});

app.delete("/product/:name", async (req, res) => {});

//Basic actions for users
app.get("/users", async (req, res) => {});

app.get("/user/:username", async (req, res) => {});

app.post("/user/:username", async (req, res) => {});

app.put("/user/:username", async (req, res) => {});

app.delete("/user/:username", async (req, res) => {});

//Additional routes and actions for products
app.get("/product_id/:_id", async (req, res) => {});

app.put("/product_id/:_id", async (req, res) => {});

app.delete("/product_id/:_id", async (req, res) => {});

app.delete("/product_dec/:_id", async (req, res) => {});

app.post("/product_inc/:_id", async (req, res) => {});

app.get("/product_num/:_id", async (req, res) => {});

app.post("/products?limit=num1&offset=num2", async (req, res) => {});

//Additional routes and actions for products
app.get("/user?username=val1&id=val2", async (req, res) => {});

connect(process.env.DB_URL)
  .then(() =>
    app.listen(port, () =>
      console.log(`Server is running on the port ${port}.`)
    )
  )
  .catch((err) => console.error("Unable to connect with the database:", err));
