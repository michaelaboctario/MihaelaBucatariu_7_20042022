//const fs = require('fs');
const { user } = require('../models');
const db = require("../models");
const Post = db.post;

exports.createPost  = (req, res) => {   
  console.log(req.body);
  Post.create({
      posttitle : req.body.posttitle,           
      postcontent : req.body.postcontent,
      postcreator : req.body.postcreator, 
      postImageUrl : "",
      userId: req.body.userId
    })
    .then(() => res.status(201).json({message: 'Post enregistré !'})) 
    .catch(error => res.status(400).json({ message: error.message }));  
};
  
exports.getOnePost = (req, res) => {
    Post.findByPk(req.params.id)
    .then(post => { res.status(200).json(post);})
    .catch(error=> { res.status(404).json({ message: error.message });});
};

exports.getAllPosts = (req, res) => {
  Post.findAll({
    order: [['updatedAt', 'DESC']],
})  
    .then(posts => {
      res.status(200).json( posts ); 
    })
    .catch(error => {
      res.status(400).json({message: error.message});
    });
};

exports.updatePost = (req, res) => {  
  Post.update({
      posttitle : req.body.posttitle,           
      postcontent : req.body.postcontent,
    },  
    {
      where: { id: req.params.id  }  
    }) 
  .then(() => res.status(200).json({ message: 'Post modifié !' }))
  .catch(error => res.status(400).json({ message: error.message }));   
};


exports.deletePost = (req, res) => {
  Post.findOne({ _id: req.params.id })
  .then(post => {
    Post.destroy({ where: { id: req.params.id } })  
    .then(() => res.status(200).json({ message: 'Post supprimé !'}))
    .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(500).json({ message: error.message }));
}