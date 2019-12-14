var express = require('express');
var router = express.Router();
/* DB */
const CosmosClient = require('@azure/cosmos').CosmosClient
const config = require('../config')
const ServiceUser = require('../services/serviceUser')
const User = require('../models/user.js')
/* DB */

const cosmosClient = new CosmosClient({
  endpoint: config.host,
  key: config.authKey
})
const user = new User(cosmosClient, config.appDabaseId, config.appContainerId)
const serviceUser = new ServiceUser(user)
user
  .init(err => {
    console.error(err)
  })
  .catch(err => {
    console.error(err)
    console.error(
      'Shutting down because there was an error settinig up the database.'
    )
    process.exit(1)
  })

  // input : string
  // output : string
router.post('/face', function (req, res, next) {
  res.send('req is ...' + req);
});

module.exports = router;