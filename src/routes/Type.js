const router = require('express').Router()
const { auth } = require('../middleware/isAuth')

const { read } = require('../controller/Type')

router.get('/', auth, read)

module.exports = router