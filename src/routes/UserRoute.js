const router = require('express').Router()
const UserController = require('../controller/UserController')

router.get('/testUser', UserController.testUser)

module.exports = router