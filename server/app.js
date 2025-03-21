const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/api', require('./routes/payment.routes'));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
