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
      .then(() => res.status(201).json({message: 'Comment enregistré !'})) 
      .catch(error => res.status(400).json({ message: error.message })
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
    res.status(400).json({message: error.message});
  });
};

exports.deleteComment = (req, res, ) => {
  Comment.findByPk(req.params.id )
    .then(comment => {
      if (!comment) {
        return res.status(404).json({ error: 'Commentaire non trouvé !' });
      }
      else {
          User.findByPk(req.auth.userId)
            .then(user => {
              if (!user.roleId !==2 || req.auth.userId !== comment.userId) {
                return res.status(401).json({ error: "Suppression non autorisée !" });       
              }
              else {
                Comment.destroy({ where: { id: req.params.id } })
                .then(() =>
                  res.status(200).json({ message: 'Commentaire supprimé !' })
                )
                .catch(error => res.status(400).json({message: error.message}));
            }}) 
          .catch(error => res.status(400).json({message: error.message}));
          }      
    })
    .catch(error => res.status(400).json({message: error.message}));
};
