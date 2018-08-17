const mysql = require('mysql');

const config = {
    host:'localhost',
    port:'3306',
    user:'root',
    password:'root',
    database:'maillist',//要连接的数据库
    connectionLimit:10//默认值
}

const pool = mysql.createPool(config);
module.exports = pool;