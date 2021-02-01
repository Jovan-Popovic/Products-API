const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

require("dotenv").config();

const connect = (url) =>
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const sendEmail = (email, user, product) => {
  // Not finished, some things will be changed
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADDRESS,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.ADDRESS,
    to: email,
    subject: `New product added!`,
    text: `It looks like that user ${user} created new product called ${product}. Check it out.`,
    attachments: {
      filename: `${product}.csv`,
      content: "",
    },
  };

  transporter.sendMail(mailOptions, (err, info) =>
    err
      ? console.log("Sending failed: ", err)
      : console.log("Email sent: ", info)
  );
};

module.exports = { connect, sendEmail };
