const {posts, comments} = require('./config/post.config');

// database
const db = require('./models/index.js');
const Role = db.role;
const User = db.user;
const Post = db.post;
const Comment = db.comment;

db.sequelize.sync().then(() => {
    console.log("Drop and resync in progress")
    initial();
})
.catch(error=>console.log(error.message));

function initial() { 
  Post.bulkCreate(posts).then(() => console.log("Posts data have been saved"));
  Comment.bulkCreate(comments).then(() => console.log("Comments data have been saved"));
}
