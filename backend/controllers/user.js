const db = require('../models');
const User = db.user;
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
                return res.status(401).json({ error : 'Mot de passe incorrect !' });   
            }
            res.status(200).json({
                userData: user,
                token: jwt.sign(
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET',  
                    { expiresIn: '24h' }             
                )
            });
        })
        .catch(error => res.status(500).json({ message: error.message }));
    })
    .catch(error => res.status(500).json({ error: 'Utilisateur non trouvé' }))
}; 
