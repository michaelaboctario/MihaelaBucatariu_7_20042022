const db = require('../models');
const User = db.user;

exports.getUser = (req, res) => 
{
    User.findByPk( req.params.id  )
    .then(user => {
        if(!user) {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        else {
            res.status(200).json(user);
    }})      
    .catch(error => res.status(404).json({ message: error.message}));
};

exports.deleteUser = (req, res) => 
{   
    User.destroy({ where: { id: req.params.id } }) 
    .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
    .catch(error => res.status(400).json({ message: error.message })); 
};

exports.getAllUser = (req, res) => {
    User.findAll()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => {
        res.status(500).send({
          message: error.message || 'Il y des erreurs pour trouver les utilisateurs',
        });
    });
};
