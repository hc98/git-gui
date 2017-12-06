const express = require('express');
const router = express.Router();
const pool = require('../public/mysql');
const HmacSHA1 = require('crypto-js/hmac-sha1');
const key = require('./key');

// 注册模块 register 暂时不提供注册服务
router.post('/register', (req, res, next)=>{
  res.end('抱歉，暂时不提供注册服务');
  /*const hash = HmacSHA1(req.body.password, key).toString();
  pool.getConnection((err, connection) => {
    const sqlRegister = 'update user set password = "' + hash + '" WHERE phone = "'+req.body.phone+'";';
    connection.query(sqlRegister, (error, results, fields) => {
      if (error) throw error;
      res.send(200, 'register success！');
      res.end();
    })
  })*/
})

// 登录模块 login 以HmacSHA1方法加密
router.post('/login', (req, res, next)=>{
  const hash = HmacSHA1(req.body.password, key).toString();
  console.log(hash);
  pool.getConnection((err, connection) => {
    const sqlLogin = 'SELECT password FROM USER WHERE phone="'+req.body.phone+'";';
    const sqlSearch = 'SELECT * FROM USER';
    connection.query(sqlLogin, (error, results, fields) => {
      if (error) throw error;
      // 数据库中不存在该用户
      if (results.length===0) {
        connection.release();
        res.send(250, '数据库中不存在该用户');
        res.end();
        return
      }

      // 数据库中存在该用户，进行密码数据对比
      if (results[0].password==='123456') {
        // 该用户尚未激活账号，应进行激活处理
        console.log('账号未激活');
        const sqlActivation = 'update user set password = "' + hash + '" WHERE phone = "'+req.body.phone+'";';
        connection.query(sqlLogin, (error, results, fields) => {
          if (error) throw error;
          //账号激活成功

        })
      } else if (results[0].password===hash) {
        // 对比成功
        connection.query(sqlSearch, (err, data, fields)=>{
          connection.release();
          if (err) throw err;
          res.send(200, {
            code: 200,
            result: data
          });
          res.end();
        })
      } else {
        // 对比失败
        console.log('密码错误');
        res.send(290, 'password error');
        res.end();
      }
    })
  })
})

// 数据列表 list
router.post('/list', (req, res, next) => {
  pool.getConnection((err, connection) => {
    connection.query('SELECT * FROM USER', (err, data, fields)=>{
      connection.release();
      if (err) throw err;
      res.send(200, data)
      res.end()
    })
  })
});

module.exports = router;
