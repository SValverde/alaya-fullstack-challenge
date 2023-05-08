const Post = require('../models/post');
const cuid = require('cuid');
const slug = require('limax');
const sanitizeHtml = require('sanitize-html');

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
getPosts = async (req, res) => {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ posts });
  });
};

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
// TODO attach files after creating the post so that we can prepend the post id to the file and avoid conflicts.
addPost = async (req, res) => {
  if (!req.body.name || !req.body.title || !req.body.content) {
    res.status(403).end();
  }

  const newPost = new Post(req.body);

  // Let's sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.content = sanitizeHtml(newPost.content);
  if (req.file) newPost.image = req.file.path;
  newPost.author = req.user._id;

  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();
  newPost.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post: saved });
  });
};

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
getPost = async (req, res) => {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post });
  });
};

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
// TODO delete img from cloudinary if the post has an imageUrl
deletePost = async (req, res) => {
  Post.findOne({ cuid: req.params.cuid}).exec((err, post) => {

    if (err) {
      res.status(500).send(err);
    }
    else if(!post){
      res.status(404).send('Not found');
    }
    else if(post.author != req.user._id){
      res.status(401).send('Unauthorized');
    }
    else{
      post.remove(() => {
        res.status(200).end();
      });
    }

  });
};

module.exports = {
  getPosts,
  addPost,
  getPost,
  deletePost
};
