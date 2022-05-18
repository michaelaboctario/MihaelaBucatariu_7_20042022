const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

// validaters
const validateEmail = require('../middleware/validate-email');
const validatePassword = require('../middleware/validate-password');

router.post('/signup',  validateEmail, validatePassword, userCtrl.signup);    
router.post('/login', userCtrl.login);
router.get('/:id', auth, userCtrl.getOneUser);
router.get('/', auth, userCtrl.getAllUser);
router.put('/:id', auth, userCtrl.updateUser);

module.exports = router;    
