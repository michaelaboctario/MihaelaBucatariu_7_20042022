const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const sqlSanitizer = require("sql-sanitizer");
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const {adminUser, moderatorUser} = require('./config/user.config');

// express application
const app = express();
app.use(express.json());

// helmet for securing the Express app by setting HTTP headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(sqlSanitizer);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Use to limit repeated requests to public APIs and/or endpoints such as password reset
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
// Apply the rate limiting middleware to all requests
app.use(limiter);

// database
const db = require('./models/index.js');
const Role = db.role;
const User = db.user;

// db.sequelize.sync();  // création des tables
db.sequelize.sync().then(() => {
    console.log('Database connected, drop and Resync Database with { force: true }');
})
.catch(error=>console.log(error.comment));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

module.exports = app;