const express = require('express');
const router = express.Router();
const {
  getBlogPosts, getBlogPostById, createBlogPost, updateBlogPost, deleteBlogPost, getComments, createComment
} = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getBlogPosts).post(protect, createBlogPost);
router.route('/:id').get(getBlogPostById).put(protect, updateBlogPost).delete(protect, deleteBlogPost);
router.route('/:postId/comments').get(getComments).post(protect, createComment);

module.exports = router;