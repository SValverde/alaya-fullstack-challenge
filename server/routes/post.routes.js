const express = require('express');
const router = express.Router();
const secureRoute = require('../middlewares/auth');
const PostController = require('../controllers/post.controller');
const parser = require('../middlewares/fileupload');

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/posts').post(secureRoute, parser.single('image'), PostController.addPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(secureRoute, PostController.deletePost);

module.exports = router;
