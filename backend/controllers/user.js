const db = require('../models');
const User = db.user;
const Role = db.role;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

exports.signup = (req, res) => {
    User.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        roleId: 1,
    })
    .then(user => {      
        res.send({ message: 'L\'utilisateur a été correctement crée!' });
    })
    .catch(error => {
        res.status(500).send({ message: error.message });
    });
};

exports.login = (req, res) => {
    User.findOne({ where: {username: req.body.username} })   
    .then(user => {
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ message : 'Mot de passe incorrect !' });   
            }
            res.status(200).json({
                userData: user,
                token: jwt.sign(
                    { userId: user.id },
                    process.env.RANDOM_SECRET_TOKEN,  
                    { expiresIn: '24h' }             
                )
            });
        })
        .catch(error => res.status(500).json({ message: error.message }));
    })
    .catch(error => res.status(500).json({ message: 'Utilisateur non trouvé' }))
}; 

exports.getAllUser = (req, res) => {
    User.findAll({
        attributes: {exclude: ['password']},
        order: [
            ['lastname', 'ASC'],
            ['firstname', 'ASC']
        ]
    }) 
      .then(users => {
        res.status(200).json( users ); 
      })
      .catch(error => {
        res.status(400).json({message: error.message});
      });
  };

exports.getOneUser = (req, res) => {
    User.findByPk(req.params.id, 
      { include: { model: Role},
        attributes: {exclude: ['password']},
    })   
    .then(user => { res.status(200).json(user)})
    .catch(error=> { res.status(404).json({ message: error.message })});
};

exports.updateUser = (req, res) => {
    User.findByPk(req.params.id).then(user => {
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvée !' });
      }
     /*  else if (req.body.userId && req.body.userId !== post.userId) {
        res.status(401).json({ message: 'Modification non autorisée !' });
      } */
      else {
        const userObject = { ...req.body};
        User.update({
            firstname : req.body.firstname,           
            lastname : req.body.lastname,
          },  
          {
            where: { id: req.params.id  }  
          }) 
        .then(() => res.status(200).json({ message: 'Utilisateur modifié !' }))
        .catch(error => res.status(400).json({ message: error.message })); 
      };   
    })
  };