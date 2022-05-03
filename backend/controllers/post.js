//const fs = require('fs');
const { user } = require('../models');
const db = require("../models");
const Post = db.post;
const User = db.user;

exports.createPost  = (req, res) => {   
  console.log(req.body);
  if (req.body.userId === req.auth.userId) {
    Post.create({
        postTitle : req.body.postTitle,           
        postContent : req.body.postContent,
        postCreator : req.body.postCreator, 
        postImageUrl : "",
        userId: req.body.userId
      })
      .then(() => res.status(201).json({message: 'Post enregistré !'})) 
      .catch(error => res.status(400).json({ message: error.message })
  )}
  else {
    res.status(403).json({ message: 'Création non autorisée !' });
  }  
};
  
exports.getOnePost = (req, res) => {
    Post.findByPk(req.params.id)
    .then(post => { res.status(200).json(post);})
    .catch(error=> { res.status(404).json({ message: error.message });});
};

exports.getAllPosts = (req, res) => {
  Post.findAll({
    order: [['updatedAt', 'DESC']],
    include: {
      model: User,
      attributes: ['firstname', 'lastname', 'username'],
    }
})  
    .then(posts => {
      res.status(200).json( posts ); 
    })
    .catch(error => {
      res.status(400).json({message: error.message});
    });
};

// exports.updatePost = (req, res) => {  
//   //if (req.body.userId && req.body.userId !== .userId) {
//   //  res.status(401).json({ message: 'Modification non autorisée !' });
//   Post.update({
//       postTitle : req.body.postTitle,           
//       postContent : req.body.postContent,
//     },  
//     {
//       where: { id: req.params.id  }  
//     }) 
//   .then(() => res.status(200).json({ message: 'Post modifié !' }))
//   .catch(error => res.status(400).json({ message: error.message }));   
// };

exports.updatePost = (req, res) => {
  Post.findByPk(req.params.id).then(post => {
    if (!post) {
      return res.status(404).json({ message: 'Post non trouvée !' });
    }
    else if (req.body.userId && req.body.userId !== post.userId) {
      res.status(401).json({ message: 'Modification non autorisée !' });
    }
    else {
      const postObject = { ...req.body};
      Post.update({
          postTitle : req.body.postTitle,           
          postContent : req.body.postContent,
        },  
        {
          where: { id: req.params.id  }  
        }) 
      .then(() => res.status(200).json({ message: 'Post modifié !' }))
      .catch(error => res.status(400).json({ message: error.message })); 
    };   
  })
};

// a verifier
exports.deletePost = (req, res) => {
  Post.findOne({ _id: req.params.id })
  .then(post => {
    Post.destroy({ where: { id: req.params.id } })  
    .then(() => res.status(200).json({ message: 'Post supprimé !'}))
    .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(500).json({ message: error.message }));
}