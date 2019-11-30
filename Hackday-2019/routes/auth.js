const express = require('express');
const router = express.Router();
//const CryptoJS = require("crypto-js");
const oauth = require('oauth');
const _twitterConsumerKey = process.env.TWITTER_CONSUMER_KEY;
const _twitterConsumerSecret = process.env.TWITTER_CONSUMER_SECRET;
const _twitterCallbackUrl = process.env.TWITTER_CALLBACK_URL;
const _twitterAccessToken = process.env.TWITTER_ACCESS_TOCKEN;
const _twitteraccessTokenSecret = process.env.TWITTER_ACCESS_SECRET;

const consumer = new oauth.OAuth("https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token", _twitterConsumerKey, _twitterConsumerSecret, "1.0A", _twitterCallbackUrl, "HMAC-SHA1");

router.get('/login/success', (req, res) => {
  res.send("login !!!");
});

router.get('/twitter', (req, res) => {
  consumer.getOAuthRequestToken(function (error, oauthToken, oauthTokenSecret, results) {
    console.log("yobaretayo");
    console.log(error);
    console.log(oauthToken);
    if (error) {
      res.send(error, 500);
      console.log(error);
    } else {
      req.session.oauthRequestToken = oauthToken;
      req.session.oauthRequestTokenSecret = oauthTokenSecret;
      const redirect = {
        redirectUrl: `https://twitter.com/oauth/authorize?oauth_token=${req.session.oauthRequestToken}`
      }
      res.send(redirect);
    }
  });
});

router.get('twitter/saveAccessTokens', (req, res) => {
  consumer.getOAuthAccessToken(
    req.query.oauth_token,
    req.session.oauthRequestTokenSecret,
    req.query.oauth_verifier,
    (error, oauthAccessToken, oauthAccessTokenSecret, results) => {
      if (error) {
        logger.error(error);
        res.send(error, 500);
      }
      else {
        req.session.oauthAccessToken = oauthAccessToken;
        req.session.oauthAccessTokenSecret = oauthAccessTokenSecret
        return res.send({ message: 'token saved' });
      }
    });
});
module.exports = router;