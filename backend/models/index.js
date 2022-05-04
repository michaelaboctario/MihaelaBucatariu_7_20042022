const config = require('../config/db.config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user.model.js')(sequelize, Sequelize);
db.role = require('../models/role.model.js')(sequelize, Sequelize);
db.post = require('../models/post.model.js')(sequelize, Sequelize);
db.message = require('../models/message.model.js')(sequelize, Sequelize);

db.role.hasMany(db.user);
db.user.belongsTo(db.role);

db.user.hasMany(db.post);
db.post.belongsTo(db.user);

db.post.hasMany(db.message);
db.message.belongsTo(db.post);

module.exports = db;
