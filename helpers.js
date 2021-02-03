const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

require("dotenv").config();

//Connect with the database
const connect = (url) =>
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

//Verify token for every api request (except for creating the user)
const verifyToken = (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (typeof authorization !== "undefined") {
    const token = authorization.split(" ")[1];
    req.token = token;
    next();
  } else res.sendStatus(403);
};

//Sign the token
const sign = (user, res) =>
  jwt.sign({ user }, "secretkey", { expiresIn: "3h" }, (err, token) =>
    !err ? res.status(201).json({ token }) : res.status(404).json(err)
  );

//Action function is what will be executed in request if the token is verified
const execRequest = (req, res, status, action) => {
  try {
    jwt.verify(req.token, "secretkey", async (err) => {
      !err
        ? action()
        : res
            .status(403)
            .json({ error: "You need to be logged in to access this route!" });
    });
  } catch (err) {
    console.log(err);
    res.status(status).json(err);
  }
};
// Send email to admins when new product is added

const sendEmail = (product) => {
  // Its not tested, so its probably not working
  const { user } = product;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADDRESS,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.ADDRESS,
    to: user.email,
    subject: `New product added!`,
    text: `It looks like that user ${user.username} created new product called ${product.name}. Check it out.`,
    attachments: [
      {
        filename: `${product.name}.csv`,
        content: `Name,User,Email,Description,Price,Quantity,Created At
        ${product.name},${user.username},${user.email},${product.description},${product.price},${product.quantity},${product.createdAt}`,
      },
    ],
  };

  transporter.sendMail(mailOptions, (err, info) =>
    err
      ? console.log("Sending failed: ", err)
      : console.log("Email sent: ", info)
  );
};

module.exports = { connect, verifyToken, sign, execRequest, sendEmail };
