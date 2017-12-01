const mysql = require('mysql');
// 配置mysql链接
let config = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'web',
  connectionLimit: 10 // 默认值
}
// 创建连接池
const pool = mysql.createPool(config);

module.exports = pool;
