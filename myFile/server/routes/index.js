const express = require('express');
const router = express.Router();
const mysql = require('mysql')
const pool = require('../DB/db');

/* GET home page. */
router.get('/', (req, res, next)=>{
  res.render('index', { title: 'Express' });
})
router.post('/login', (req, res, next) => {
  // 创建连接池连接
  pool.getConnection((err, connection) => {
    // 要使用的sql语句
    let sqlRegister = 'SELECT userId, password FROM userTable WHERE userPhone="'+req.body.phone+'"';
    // 'INSERT INTO userTable(userId, userName, userPhone, password, userEquipment, createTime, updateTime) VALUE (1, "hc", "17633559839", "000000", "android", "2018-4-11", "2018-04-11")';
    // 操作数据库
    connection.query(sqlRegister, (error, results, fields) => {
      // 如果有异常则抛出
      if (error) {
        res.status(404).send({msg:'数据异常！'}).end();
        throw error;
      }
      // 返回数据之后，要进行的操作
      if (results.length===0) {
        res.status(201).send({msg:'账号不存在！'}).end()
      } else if (results[0].password === req.body.password) {
        console.log(results[0].userId);
        res.cookie('no', results[0].userId)
        res.status(200).send({msg:'登录成功！'}).end()
      } else {
        res.status(202).send({msg:'密码错误！'}).end()
      }
    })
  })
});
router.post('/home', (req, res, next) => {
  // 创建连接池连接
  pool.getConnection((err, connection) => {
    // 要使用的sql语句
    let sqlRegister = 'SELECT * FROM businesscard WHERE userId="'+req.body.userId+'"';
    // 'INSERT INTO userTable(userId, userName, userPhone, password, userEquipment, createTime, updateTime) VALUE (1, "hc", "17633559839", "000000", "android", "2018-4-11", "2018-04-11")';
    // 操作数据库
    connection.query(sqlRegister, (error, results, fields) => {
      // 如果有异常则抛出
      if (error) {
        res.status(404).send({msg:'数据异常！'}).end();
        throw error;
      }
      console.log(results);
      // 返回数据之后，要进行的操作
      if (results.length===0) {
        res.status(201).send({msg:''}).end()
      } else if (results[0].password === req.body.password) {
        console.log(res);
        res.status(200).send({msg:''}).end()
      } else {
        res.status(202).send({msg:''}).end()
      }
    })
  })
});
router.post('/create', (req, res, next) => {
  // 创建连接池连接
  pool.getConnection((err, connection) => {
    // 要使用的sql语句
    let sqlRegister = 'SELECT * FROM businesscard WHERE userId="'+req.body.userId+'"';
    // 'INSERT INTO userTable(userId, userName, userPhone, password, userEquipment, createTime, updateTime) VALUE (1, "hc", "17633559839", "000000", "android", "2018-4-11", "2018-04-11")';
    // 操作数据库
    connection.query(sqlRegister, (error, results, fields) => {
      // 如果有异常则抛出
      if (error) {
        res.status(404).send({msg:'数据异常！'}).end();
        throw error;
      }
      console.log(results);
      // 返回数据之后，要进行的操作
      if (results.length===0) {
        res.status(201).send({msg:''}).end()
      } else if (results[0].password === req.body.password) {
        console.log(res);
        res.status(200).send({msg:''}).end()
      } else {
        res.status(202).send({msg:''}).end()
      }
    })
  })
});

module.exports = router;