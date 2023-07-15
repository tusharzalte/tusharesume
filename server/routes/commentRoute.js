const express = require('express');
const router = express.Router();
const Comment = require('../models/commentModel');
const User = require('../models/userModel');

// Get comments for a particular post
router.get('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId });
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Error fetching comments', error: error.message });
  }
});

// Create a new comment for a particular post
router.post('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const { comment, username } = req.body;

    if (!comment || !username) {
      return res.status(400).json({ message: 'Missing comment or username' });
    }

    const newComment = new Comment({
      postId,
      username,
      comment,
    });

    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Error creating comment', error: error.message });
  }
});

// Get user details of a particular post
router.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});

module.exports = router;
