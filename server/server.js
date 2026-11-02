require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

connectDB(); // 连接数据库

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' })); // 放宽限制：富文本里的本地图片以 base64 存储

// 测试接口
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// API 首页
app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Capstone Portfolio API</title>
  <style>
    body{background:#0b1020;color:#e2e8f0;font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
    .card{background:#151b2e;border:1px solid #2a3450;border-radius:16px;padding:40px 48px;max-width:520px;box-shadow:0 20px 60px rgba(0,0,0,.4)}
    h1{margin:0 0 8px;font-size:22px}
    .ok{color:#34d399;font-size:14px;margin-bottom:24px}
    ul{line-height:2;padding-left:20px;margin:0}
    code{background:#1e2740;padding:2px 8px;border-radius:6px;font-size:13px}
    a{color:#818cf8;text-decoration:none}
    p.meta{margin-top:24px;font-size:13px;color:#94a3b8}
  </style>
</head>
<body>
  <div class="card">
    <h1>Capstone Portfolio API</h1>
    <div class="ok">● Status: running</div>
    <ul>
      <li><code>GET /api/health</code> — health check</li>
      <li><code>GET /api/projects</code> — list projects</li>
      <li><code>GET /api/blog</code> — list blog posts</li>
      <li><code>POST /api/contact</code> — contact form</li>
      <li><code>POST /api/users/login</code> — JWT login</li>
    </ul>
    <p class="meta">Source: <a href="https://github.com/gavinkeith/Blog">github.com/gavinkeith/Blog</a></p>
  </div>
</body>
</html>`);
});

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/blog', require('./routes/blogRoutes'));       // 博客路由
app.use('/api/contact', require('./routes/contactRoutes')); // 联系表单路由

// 错误处理（必须放在所有路由的最后面）
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});