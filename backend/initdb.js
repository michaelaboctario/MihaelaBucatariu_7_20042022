const bcrypt = require('bcrypt');
const {adminUser, moderatorUser, allUser} = require('./config/user.config');
const { user } = require('./models/index.js');

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
   
    const allUserHashedPasswd = allUser.map(user => ({...user, password: bcrypt.hashSync(user.password, 10)}));
    await User.bulkCreate(allUserHashedPasswd).then(() => console.log("Tous les utilisateurs on été crées"));
  } catch (err) {
    console.log(err);
  }
}
