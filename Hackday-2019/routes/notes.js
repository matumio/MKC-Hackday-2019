var express = require('express');
var router = express.Router();
/* DB */
const CosmosClient = require('@azure/cosmos').CosmosClient
const config = require('../config')
const ServiceNote = require('../services/serviceNote')
const Note = require('../models/note.js')
/* DB */

const cosmosClient = new CosmosClient({
  endpoint: config.host,
  key: config.authKey
})
const note = new Note(cosmosClient, config.appDabaseId, config.appContainerId)
const serviceNote = new ServiceNote(note)
note
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

router.get('/', (req, res, next) => serviceNote.showNotes(req, res).catch(next))
router.post('/add', (req, res, next) => serviceNote.addNote(req, res).catch(next))
router.post('/completetask', (req, res, next) =>
  serviceNote.completeNote(req, res).catch(next)
)

// /delete
// router.post('/delete', (req, res, next), function(){
//   res.redirect('/');
// });


module.exports = router;