const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// Middlewares
const auth = require("../../middleware/auth");

// Models
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");

/**
 * @route   POST api/posts
 * @desc    Create a post
 * @access  Private
 */
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user = await User.findById(req.user.id).select("-password");
      const newPost = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      const post = new Post(newPost);
      await post.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route   GET api/posts
 * @desc    Get all posts
 * @access  Private
 */
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    if (!posts) {
      return res.status(404).json({ message: "No Posts Found" });
    }
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   GET api/posts/:id
 * @desc    Get post by ID
 * @access  Private
 */
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "No Posts Found" });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "No Posts Found" });
    }
    res.status(500).send("Server Error");
  }
});

/**
 * @route   DELETE api/posts/:id
 * @desc    Delete a post by ID
 * @access  Private
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "No Posts Found" });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not Authorized!" });
    }
    await post.remove();
    res.json({ message: "Post Removed!" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Post Not Found" });
    }
    res.status(500).send("Server Error");
  }
});

/**
 * @route   PUT api/posts/like/:id
 * @desc    Like a post
 * @access  Private
 */
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ message: "Post Already Liked!" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   PUT api/posts/unlike/:id
 * @desc    Unlike a post
 * @access  Private
 */
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ message: "Post Already Unliked!" });
    }
    post.likes = post.likes.filter(
      (item) => item.user.toString() !== req.user.id
    );
    await post.save();
    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   PUT api/posts/comment/:id
 * @desc    Comment on a post
 * @access  Private
 */
router.put(
  "/comment/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      post.comments.push(newComment);
      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route   DELETE api/posts/comment/:post_id/:comment_id
 * @desc    Delete a comment on a post
 * @access  Private
 */
router.delete("/comment/:post_id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ message: "No Posts Found" });
    }
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment) {
      return res.status(404).json({ message: "Comment Not Found!" });
    }
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not Authorized!" });
    }
    post.comments = post.comments.filter(
      (comment) => comment.id !== req.params.comment_id
    );
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
