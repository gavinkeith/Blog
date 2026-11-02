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

// 👇 挂载所有路由 👇
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/blog', require('./routes/blogRoutes'));       // 👈 新增的博客路由
app.use('/api/contact', require('./routes/contactRoutes')); // 👈 新增的联系表单路由

// 错误处理（必须放在所有路由的最后面）
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});