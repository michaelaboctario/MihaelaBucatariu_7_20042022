const {posts, comments} = require('./config/post.config');

// database
const db = require('./models/index.js');
const Role = db.role;
const User = db.user;
const Post = db.post;
const Comment = db.comment;

db.sequelize.sync().then(() => {
    console.log("Drop et resync en progrès")
    initial();
})
.catch(error=>console.log(error.message));

async function initial() { 
  try {
      await Post.bulkCreate(posts).then(() => console.log("Les messages on été crées"));
      await Comment.bulkCreate(comments).then(() => console.log("Les commentaires on été crées"));
    //
  } catch (err) {
    console.log(err);
  }
}