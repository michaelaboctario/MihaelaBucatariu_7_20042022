//const { user } = require('../models');
//const { message } = require('../models')
const db = require("../models");
const Message = db.message;
//const Post = db.post;
//const User = db.user;

exports.createMessage  = (req, res) => {   
  if (req.body.userId === req.auth.userId) {
    Message.create({ 
        messageContent : req.body.messageContent,
        postId : req.params.postId, 
      })
      .then(() => res.status(201).json({message: 'Message enregistré !'})) 
      .catch(error => res.status(400).json({ message: error.message })
  )}
  else {
    res.status(403).json({ message: 'Création non autorisée !' });
  }  
};
  
exports.getAllMessages = (req, res) => {
  Message.findAll({
    order: [['updatedAt', 'DESC']],
    where: {
      postId: req.params.postId
  }})  
  .then(messages => {
    res.status(200).json( messages ); 
  })
  .catch(error => {
    res.status(400).json({message: error.message});
  });
};