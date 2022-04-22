const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/admin');

router.get('/users', adminCtrl.getAllUser);
router.delete('/:id', adminCtrl.deleteUser);
router.get('/:id', adminCtrl.getUser);   
  

module.exports = router;    
