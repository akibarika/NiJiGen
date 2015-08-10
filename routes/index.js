var express = require('express');
var router = express.Router();
var file_ctrl = require('../controller/file-ctrl');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
