const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');

// @desc    获取所有博客（列表页只返回内容摘要，避免传输富文本全文/base64 大图导致跨国链路缓慢）
const getBlogPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .lean(); // lean() 返回普通对象，方便修改
    res.json(posts.map((p) => ({
      ...p,
      content: typeof p.content === 'string' ? p.content.slice(0, 500) : p.content,
    })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    获取单篇博客及评论
const getBlogPostById = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate('author', 'username');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const comments = await Comment.find({ post: post._id }).populate('author', 'username').sort({ createdAt: -1 });
    res.json({ post, comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    创建博客
const createBlogPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = new BlogPost({ title, content, author: req.user._id });
    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 授权判断：作者本人 或 管理员（root）均可操作
const canManage = (post, user) =>
  post.author.toString() === user._id.toString() || user.role === 'admin';

// @desc    更新博客（仅限作者或管理员）
const updateBlogPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (!canManage(post, req.user)) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    删除博客（仅限作者或管理员）
const deleteBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (!canManage(post, req.user)) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await Comment.deleteMany({ post: post._id });
    await post.deleteOne();
    res.json({ message: 'Post and comments removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    获取某文章的评论
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate('author', 'username');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    添加评论
const createComment = async (req, res) => {
  const { body } = req.body;
  try {
    const post = await BlogPost.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const comment = new Comment({ body, author: req.user._id, post: req.params.postId });
    const createdComment = await comment.save();
    res.status(201).json(createdComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getBlogPosts, getBlogPostById, createBlogPost, updateBlogPost, deleteBlogPost, getComments, createComment
};