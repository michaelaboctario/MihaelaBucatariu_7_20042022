const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const {adminUser, moderatorUser, firstUser} = require('./config/user.config');

// express application
const app = express();
app.use(express.json());

const {SYNC_DB}=process.env; 

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// database
const db = require('./models/index.js');
const { exit } = require('process');
const Role = db.role;
const User = db.user;

// db.sequelize.sync();  // création des tables
// force: true will drop the table if it already exists
const forcesync = SYNC_DB==='SYNC';
console.log(forcesync);

db.sequelize.sync({force: forcesync}).then(() => {
  if(forcesync) {
    console.log("Drop and resync in progress")
    initial();
  }
  else {
    console.log('Database connected, drop and Resync Database with { force: true }');
  }})
.catch(error=>console.log(error.comment));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

function initial() {
  Role.create({
    id: 1,
    name: "admin"
  });
  Role.create({
    id: 2,
    name: "moderator"
  });
  Role.create({
    id: 3,
    name: "user"
  });

  User.create(Object.assign({...adminUser}, {password: bcrypt.hashSync(adminUser.password, 10)}));
  User.create(Object.assign({...moderatorUser}, {password: bcrypt.hashSync(moderatorUser.password, 10)}));
  User.create(Object.assign({...firstUser}, {password: bcrypt.hashSync(firstUser.password, 10)}));
}
module.exports = app;