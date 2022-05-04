const express = require('express');
const router = express.Router();

const messageCtrl = require('../controllers/message');
const auth = require('../middleware/auth');

router.post('/', auth, messageCtrl.createMessage);
//router.delete('/:id', auth, postCtrl.deletePost);
router.get('/', auth, messageCtrl.getAllMessages);

module.exports = router;  