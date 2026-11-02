const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']); // 强制使用 Cloudflare 和 Google 的 DNS

const mongoose = require('mongoose');
// ... 下面的代码保持不变

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;