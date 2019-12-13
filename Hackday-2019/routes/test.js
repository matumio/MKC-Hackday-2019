var express = require('express');
var router = express.Router();
/* DB */
const CosmosClient = require('@azure/cosmos').CosmosClient
const config = require('../config')
const TaskList = require('../services/taskList.js')
const TaskDao = require('../models/taskDao.js')
/* DB */

const cosmosClient = new CosmosClient({
  endpoint: config.host,
  key: config.authKey
})
const taskDao = new TaskDao(cosmosClient, config.databaseId, config.containerId)
const taskList = new TaskList(taskDao)
taskDao
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

router.get('/', (req, res, next) => taskList.showTasks(req, res).catch(next))
router.post('/addtask', (req, res, next) => taskList.addTask(req, res).catch(next))
router.post('/completetask', (req, res, next) =>
  taskList.completeTask(req, res).catch(next)
)

module.exports = router;


