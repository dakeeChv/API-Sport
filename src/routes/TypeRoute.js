const router = require('express').Router()
//const { auth } = require('../middleware/isAuth')
const { admin } = require('../middleware/isAdmin')

const { read, create, update, destory } = require('../controller/TypeController')

router.get('/', admin, read)
router.post('/', create)
router.patch('/', update)
router.delete('/:id', destory)

module.exports = router