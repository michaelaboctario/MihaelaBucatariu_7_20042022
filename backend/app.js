const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');

// express application
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

  // path for images folder
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;