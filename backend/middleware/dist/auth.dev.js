"use strict";

var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  console.log(process.env.RANDOM_SECRET_TOKEN);

  try {
    console.log(req);
    console.log(req.headers);
    var token = req.headers.authorization.split(' ')[1];
    var decodedToken = jwt.verify(token, process.env.RANDOM_SECRET_TOKEN);
    var userId = decodedToken.userId;
    req.auth = {
      userId: userId
    };

    if (req.body.userId && req.body.userId !== userId) {
      throw new Error('ID de l\'utilisateur invalide !');
    } else {
      next();
    }
  } catch (_unused) {
    res.status(401).json({
      message: 'Requête invalide !'
    });
  }
};