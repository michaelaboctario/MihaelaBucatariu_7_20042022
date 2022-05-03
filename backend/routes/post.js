const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');

router.post('/', auth, postCtrl.createPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);
router.get('/', auth, postCtrl.getAllPosts);

module.exports = router;  