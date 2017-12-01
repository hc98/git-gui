const express = require('express');
const router = express.Router();
const pool = require('../public/mysql');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('index', { title: 'hc' });
});

router.post('/list', (req, res, next) => {
  console.log(req.body);  // 传入的参数
  const sql = 'SELECT * FROM USER';
  pool.getConnection((err, connection) => {
    connection.query(sql, (error, results, fields) => {
      if (error) throw error;
      res.send(results)
      // console.log(error);
      // console.log(results);
      // console.log(fields);
      connection.release();
      res.end()
    })
  })
});

module.exports = router;
