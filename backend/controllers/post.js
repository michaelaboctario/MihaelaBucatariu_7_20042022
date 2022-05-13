const { user } = require('../models');
const db = require("../models");
const Post = db.post;
const User = db.user;

exports.createPost  = (req, res) => {   
  if (req.body.userId === req.auth.userId) {
    Post.create({
        postTitle : req.body.postTitle,           
        postContent : req.body.postContent,
        postCreator : req.body.postCreator, 
        postImageUrl : "",
        userId: req.body.userId
      })
      .then(() => res.status(201).json({message: 'Message enregistré !'})) 
      .catch(error => res.status(400).json({ message: error.message })
  )}
  else {
    res.status(403).json({ message: 'Création non autorisée !' });
  }  
};
  
exports.getOnePost = (req, res) => {
    Post.findByPk(req.params.id, 
      { include: {
        model: User,
        attributes: ['firstname', 'lastname', 'username'],
      }})   
    .then(post => { res.status(200).json(post)})
    .catch(error=> { res.status(404).json({ message: error.message })});
};

exports.getAllPosts = (req, res) => {
  Post.findAll({
    order: [['updatedAt', 'DESC']],
    include: {
      model: User,
      attributes: ['firstname', 'lastname', 'username'],
  }})  
    .then(posts => {
      res.status(200).json( posts ); 
    })
    .catch(error => {
      res.status(400).json({message: error.message});
    });
};

exports.updatePost = (req, res) => {
  Post.findByPk(req.params.id).then(post => {
    if (!post) {
      return res.status(404).json({ message: 'Message non trouvée !' });
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
      .then(() => res.status(200).json({ message: 'Message modifié !' }))
      .catch(error => res.status(400).json({ message: error.message })); 
    };   
  })
};

exports.deletePost = (req, res) => {
  Post.findByPk(req.params.id)
  .then(post => {
    if (!post) {
      return res.status(404).json({ message: 'Message non trouvée !' });
    }
    else if (req.body.userId && (req.body.userId !== 1 || req.body.userId !== 2 || req.body.userId !== post.userId)) {
      res.status(401).json({ message: 'Suppression non autorisée !' });
    }
    else {
      Post.destroy({ where: { id: req.params.id } })  
            .then(() => res.status(200).json({ message: 'Message supprimé !'}))
            .catch(error => res.status(400).json({ error }));
    };   
  })
  .catch(error => res.status(500).json({ message: error.message }));
}