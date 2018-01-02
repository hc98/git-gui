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
  pool.getConnection((err, connection) => {
    const sqlLogin = 'SELECT id, password FROM USER WHERE phone="'+req.body.phone+'";';
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
        // 对比成功, 更新status表的登录状态
        const sqlStatus = 'update status set status="1" where id="'+results[0].id+'"';
        connection.query(sqlStatus, (err, status, fields)=>{
          connection.release();
          if (err) throw err;
          res.send(200, {
            code: 200
          });
          res.end();
        })
      } else {
        // 对比失败
        res.send(290, 'password error');
        res.end();
      }
    })
  })
})

// 退出模块 exit
router.post('/exit', (req, res, next) => {
  pool.getConnection((error, connection) => {
    const sqlStatus = 'update status set status="0" where id="'+req.body.id+'"';
    connection.query(sqlStatus, (err, data, fields)=>{
      connection.release();
      if (err) {
        res.send(250, 'error');
        throw err;
      } else {
        res.send(200);
      }
      res.end();
    })
  })
})

// 修改个人信息
router.post('/update', (req, res, next) => {
  const data = req.body.person;
  const sqlUpdate = 'update user set name="'+data.name+'", nick="'+data.nick+'", sex="'+data.sex+'", phone="'+data.phone+'",birth="'+data.birth+'", address="'+data.address+'",remark="'+data.remark+'" where id="'+data.id+'"';
  pool.getConnection((err, connection) => {
    connection.query(sqlUpdate, (err, data, fields)=>{
      connection.release();
      if (err) throw err;
      res.send(200)
      res.end()
    })
  })
});

// 删除数据 del
router.post('/del', (req, res, next) => {
  const obj = req.body;
  let sql = 'DELETE FROM USER WHERE id in (' + obj.ids.join() + ');';
  pool.getConnection((err, connection) => {
    connection.query(sql, (err, data, fields) => {
      if (err) throw err;
      res.send(200, {
        code: 200,
        msg: "删除成功"
      })
      res.end();
    })
  })
})

// 添加数据 add
router.post('/add', (req, res, next) => {
  const obj = req.body;
  let sql = 'INSERT INTO user (name, nick, sex, phone, address, birth, remark) VALUES("'+obj.name+'", "'+obj.nick+'", "'+obj.sex+'", "'+obj.phone+'", "'+obj.address+'", "'+obj.birth+'", "'+obj.remark+'");';
  pool.getConnection((err, connection) => {
    connection.query(sql, (err, data, fields) => {
      if (err) throw err;
      res.send(200, {
        code: 200,
        msg: "添加成功"
      })
      res.end();
    })
  })
})

// 数据列表 list
router.post('/list', (req, res, next) => {
  const phone = req.body.phone;
  if (phone.length!==11) {
    res.send(250, '账号错误');
    res.end();
    return;
  }
  pool.getConnection((err, connection) => {
    connection.query('SELECT id,name,nick,sex,phone,address,remark,birth FROM USER', (err, data, fields)=>{
      connection.release();
      if (err) throw err;
      let objArr = [], obj1 = {};
      for (let i = 0, j = 0, len = data.length; i < len; i++, j++) {
        if(data[i].phone==phone){
          obj1 = data[i];
          j-=1;
          continue;
        }
        objArr[j] = data[i]
      }
      objArr.push(obj1);
      res.send(200, objArr)
      res.end()
    })
  })
});

module.exports = router;
