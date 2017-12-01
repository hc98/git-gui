var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('users');
  res.send('respond with a resource');
});
router.post('/', function(req, res, next) {
  console.log('usersPost');
  res.send('respond with a resource666');
});
module.exports = router;
