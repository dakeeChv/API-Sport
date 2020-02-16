const router = require('express').Router()

const { signup, signin } = require('../controller/User')

router.post('/', signup)
router.get('/', signin)

module.exports = router