/* 
認証を行う処理を配置している。
*/
var express = require('express');
var router = express.Router();
var passport = require('passport');

// Twitter の認証APIにリクエストする
router.get('/twitter', passport.authenticate('twitter'), function (req, res, next) {
  console.log(req, res, next);
  res.send('get twitter');
});

// /auth/twitter/callbackにアクセスした時（Twitterログイン後）
router.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), function (req, res) {
  console.log("im login");
  res.redirect('/'); //indexへリダイレクトさせる
});

module.exports = router;
