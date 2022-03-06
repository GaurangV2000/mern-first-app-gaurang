const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

dotenv.config({ path: "./config.env" });
require("./DB/conn.js");

app.use(express.json());
// const User = require("./model/User");

app.use(require("./router/auth"));

const PORT = process.env.PORT || 5000;

// app.get("/login", (req, res) => {
//   res.send("Hello  Kogin World From app Database");
// });

// app.get("/about", (req, res) => {
//   res.send("Hello About World From Database");
// });

app.get("/home", (req, res) => {
  res.send("Hello Home World From Database");
});

// app.get("/contact", (req, res) => {
//   res.send("Hello Contact World From Database");
// });

//hosting

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});



