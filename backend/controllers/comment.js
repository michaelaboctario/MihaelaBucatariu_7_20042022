const db = require("../models");
const Comment = db.comment;
const User = db.user;

exports.createComment  = (req, res) => {   
  if (req.body.userId === req.auth.userId) {
    Comment.create({ 
        commentContent: req.body.commentContent,
        userId: req.body.userId,
        postId : req.params.postid, 
      })
      .then(() => res.status(201).json({comment: 'Comment enregistré !'})) 
      .catch(error => res.status(400).json({ comment: error.comment })
  )}
  else {
    res.status(403).json({ message: 'Création non autorisée !' });
  }  
};
  
exports.getAllComments = (req, res) => {
  Comment.findAll({
    order: [['updatedAt', 'DESC']],
    include: {
      model: User,
      attributes: ['firstname', 'lastname', 'username'],
    },
    where: {
      postId: req.params.postid
  }})  
  .then(comments => {
    res.status(200).json( comments ); 
  })
  .catch(error => {
    res.status(400).json({comment: error.comment});
  });
};