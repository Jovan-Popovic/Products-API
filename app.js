const express = require("express");
const { json } = require("body-parser");

require("dotenv").config();

const connect = require("./helpers");

const app = express();
const port = process.env.PORT || 5000;

app.use(json());

connect(process.env.DB_URL)
  .then(() =>
    app.listen(port, () =>
      console.log(`Server is running on the port ${port}.`)
    )
  )
  .catch((err) => console.error("Unable to connect with the database:", err));
