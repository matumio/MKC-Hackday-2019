var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('face', { title: 'Express', session: req.session.passport });
});

module.exports = router;
