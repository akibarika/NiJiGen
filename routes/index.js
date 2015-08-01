var express = require('express');
var router = express.Router();
var file_ctrl = require('../controller/file-ctrl.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* uploading */
router.post('/upload',file_ctrl.upload);

module.exports = router;
