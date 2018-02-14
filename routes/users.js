var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a respond');
});

router.get('/def', function(req, res, next) {
  res.send('respond with a def');
});

module.exports = router;
