const bcrypt = require('bcrypt');
const {adminUser, moderatorUser, firstUser} = require('./config/user.config');

// database
const db = require('./models/index.js');
const Role = db.role;
const User = db.user;

db.sequelize.sync({force: true}).then(() => {
    console.log("Drop and resync in progress")
    initial();
})
.catch(error=>console.log(error.message));

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
