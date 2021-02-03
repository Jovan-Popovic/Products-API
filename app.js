const express = require("express");
const { json } = require("body-parser");

require("dotenv").config();

const Product = require("./controllers/product");
const User = require("./controllers/user");
const {
  connect,
  verifyToken,
  sign,
  execRequest,
  sendEmail,
} = require("./helpers");

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

//Login route
app.post("/login", async (req, res) => {
  try {
    const { body } = req;
    const user = await User.findOne(body, ["email", "password"]);
    sign(user, res);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//Basic actions for users
app.get("/users", verifyToken, (req, res) => {
  execRequest(req, res, 404, async () => {
    const users = await User.findAll();
    res.status(200).json(users);
  });
});

app.get("/user/:username", verifyToken, (req, res) => {
  execRequest(req, res, 404, async () => {
    const { username } = req.params;
    const user = await User.findOne({ username });
    res.status(200).json(user);
  });
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

app.put("/user/:username", verifyToken, (req, res) => {
  execRequest(req, res, 400, async () => {
    const { username } = req.params;
    const { body } = req;
    const user = await User.findOneAndUpdate({ username }, body);
    res.status(201).json(user);
  });
});

app.delete("/user/:username", verifyToken, (req, res) => {
  execRequest(req, res, 400, async () => {
    const { username } = req.params;
    const user = await User.deleteOne({ username });
    res.status(200).json(user);
  });
});

//Additional routes and actions for products
app.get("/user", verifyToken, (req, res) => {
  execRequest(req, res, 404, async () => {
    const { username, id: _id } = req.query;
    const user = await User.findOne({ username, _id });
    res.status(200).json(user);
  });
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

app.put("/user", verifyToken, (req, res) => {
  execRequest(req, res, 400, async () => {
    const { username, id: _id } = req.query;
    const { body } = req;
    const user = await User.findOneAndUpdate({ username, _id }, { $set: body });
    res.status(201).json(user);
  });
});

app.delete("/user", verifyToken, (req, res) => {
  execRequest(req, res, 400, async () => {
    const { username, id: _id } = req.query;
    const user = await User.deleteOne({ username, _id });
    res.status(200).json(user);
  });
});

//Basic actions for products
app.get("/products", verifyToken, (req, res) => {
  execRequest(req, res, 404, async () => {
    const { limit, offset } = req.query;
    const products = await Product.findAll(limit, offset);
    res.status(200).json(products);
  });
});

app.get("/product/:name", verifyToken, (req, res) => {
  execRequest(req, res, 404, async () => {
    const { name } = req.params;
    const product = await Product.findOne({ name });
    res.status(200).json(product);
  });
});

app.post("/product/:name", verifyToken, (req, res) => {
  execRequest(req, res, 400, async () => {
    const { name } = req.params;
    const { body } = req;
    const product = await Product.create({ name, ...body });
    //sendEmail(product);
    res.status(201).json(product);
  });
});

app.put("/product/:name", verifyToken, (req, res) => {
  execRequest(req, res, 400, async () => {
    const { name } = req.params;
    const { body } = req;
    const product = await Product.findOneAndUpdate({ name }, { $set: body });
    res.status(201).json(product);
  });
});

app.delete("/product/:name", verifyToken, (req, res) => {
  execRequest(req, res, 400, async () => {
    const { name } = req.params;
    const product = await Product.deleteOne({ name });
    res.status(200).json(product);
  });
});

//Additional routes and actions for products
app.get("/product_id/:_id", verifyToken, (req, res) => {
  execRequest(req, res, 404, async () => {
    const { _id } = req.params;
    const product = await Product.findOne({ _id });
    res.status(200).json(product);
  });
});

app.put("/product_id/:_id", verifyToken, (req, res) => {
  execRequest(req, res, 400, async () => {
    const { _id } = req.params;
    const { body } = req;
    const product = await Product.findOneAndUpdate({ _id }, { $set: body });
    res.status(201).json(product);
  });
});

app.delete("/product_id/:_id", verifyToken, (req, res) => {
  execRequest(req, res, 400, async () => {
    const { _id } = req.params;
    const product = await Product.deleteOne({ _id });
    res.status(200).json(product);
  });
});

app.put("/product_dec/:_id", verifyToken, (req, res) => {
  execRequest(req, res, 400, async () => {
    const { _id } = req.params;
    const product = await Product.findOneAndUpdate(
      { _id },
      { $inc: { quantity: -1 } }
    );
    res.status(200).json({ quantity: product.quantity });
  });
});

app.put("/product_inc/:_id", verifyToken, (req, res) => {
  execRequest(req, res, 400, async () => {
    const { _id } = req.params;
    const product = await Product.findOneAndUpdate(
      { _id },
      { $inc: { quantity: 1 } }
    );
    res.status(201).json({ quantity: product.quantity });
  });
});

app.get("/product_num/:_id", verifyToken, (req, res) => {
  execRequest(req, res, 400, async () => {
    const { _id } = req.params;
    const product = await Product.findOne({ _id });
    res.status(200).json({ quantity: product.quantity });
  });
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
