const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
//const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');

router.post('/', postCtrl.createPost);
router.get('/:id', postCtrl.getOnePost);
router.put('/:id', postCtrl.updatePost);
router.delete('/:id', postCtrl.deletePost);
router.get('/', postCtrl.getAllPosts);

module.exports = router;  