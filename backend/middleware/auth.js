const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.RANDOM_SECRET_TOKEN);
      const userId = decodedToken.userId;
      req.auth = { userId: userId };
      if (req.body.userId && req.body.userId !== userId) {
        throw new Error('ID de l\'utilisateur invalide !');
    } else {
        next();
    }
  } catch {
      res.status(401).json({
        message: 'Requête invalide !'
    });
  }
};