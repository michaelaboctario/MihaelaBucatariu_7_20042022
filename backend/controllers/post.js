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

//[['name', 'DESC']]
exports.getAllPosts = (req, res, next) => {
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


