const db = require("../models");
const Comment = db.comment;

exports.createComment  = (req, res) => {   
  if (req.body.userId === req.auth.userId) {
    Comment.create({ 
        commentContent : req.body.commentContent,
        postId : req.params.postId, 
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
    where: {
      postId: req.params.postId
  }})  
  .then(comments => {
    res.status(200).json( comments ); 
  })
  .catch(error => {
    res.status(400).json({comment: error.comment});
  });
};