const bcrypt = require('bcrypt');
const {adminUser, moderatorUser, firstUser} = require('./config/user.config');

// database
const db = require('./models/index.js');
const Role = db.role;
const User = db.user;

db.sequelize.sync({force: true}).then(() => {
    console.log("Drop et resync en progrès")
    initial();
})
.catch(error=>console.log(error.message));

async function initial() {
  try {
    await Role.create({ id: 1, name: "admin"});
    await Role.create({id: 2, name: "moderator"});
    await Role.create({id: 3, name: "user"});  
    await User.create(Object.assign({...adminUser}, {password: bcrypt.hashSync(adminUser.password, 10)}));
    await User.create(Object.assign({...moderatorUser}, {password: bcrypt.hashSync(moderatorUser.password, 10)}));
    await User.create(Object.assign({...firstUser}, {password: bcrypt.hashSync(firstUser.password, 10)}));
  } catch (err) {
    console.log(err);
  }
}
