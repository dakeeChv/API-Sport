const router = require('express').Router()
const AthleteController = require('../controller/AthleteController')

router.get('/testAthlete', AthleteController.testAthlete)

module.exports = router