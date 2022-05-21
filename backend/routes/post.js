const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.post('/', auth, postCtrl.createPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);
router.get('/', auth, postCtrl.getAllPosts);

router.post('/:postid/comments', auth, commentCtrl.createComment);
router.get('/:postid/comments', auth, commentCtrl.getAllComments);
router.delete('/comments/:commentid', auth, commentCtrl.deleteComment);

module.exports = router;  