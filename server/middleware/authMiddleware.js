const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // 检查请求头里有没有 Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 使用正则提取 Bearer 后面的所有内容，并去除前后空白字符（这比 split 更稳）
      token = req.headers.authorization.replace(/^Bearer\s+/i, '').trim();

      // 验证 token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 根据 token 里的 id 找到用户，并挂载到 req 上
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      next();
    } catch (error) {
      console.error('Token 验证失败:', error.message); // 👈 这一行会在终端打印具体原因
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };