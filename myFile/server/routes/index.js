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
        res.status(201).send({data: [], msg: '暂无数据！'}).end()
      } else {
        res.status(200).send({msg:'操作成功！', data: results}).end()
      }
    })
  })
});
router.post('/create', (req, res, next) => {
  try {
    const item = req.body.params, createTime = updateTime = new Date().format('yyyy-MM-dd hh-mm-ss');
    // 创建连接池连接
    pool.getConnection((err, connection) => {
      // 要使用的sql语句
      let sqlRegister = 'INSERT INTO businesscard(userId, name, sex, phone, tel, address, class, company, past, occupation, createTime, updateTime, email, internetAccount, remark) VALUE ('+item.userId+', "'+item.name+'", "'+item.sex+'", "'+item.phone+'", "'+item.tel+'", "'+item.address+'", "'+item.class+'", "'+item.company+'", "'+item.past+'", "'+item.occupation+'", "'+createTime+'", "'+updateTime+'", "'+item.email+'", "'+item.internetAccount+'", "'+item.remark+'")';
      // 操作数据库
      connection.query(sqlRegister, (error, results, fields) => {
        // 如果有异常则抛出
        if (error) {
          res.status(404).send({msg:'数据异常！'}).end();
          throw error;
        }
        console.log(results);
        // 返回数据之后，要进行的操作
        res.status(200).send({msg:'保存成功！'}).end()
      })
    })
  } catch (error) {
    res.status(404).send({msg:'服务器错误！'}).end();
    console.log(error);
  }
});

Date.prototype.format = function(format) {
  let date = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
}

module.exports = router;