const router = require('express').Router()

const { signup, signin, update, destory } = require('../controller/UserController')

router.post('/', signup)
router.get('/', signin)
router.patch('/', update)
router.delete('/:id', destory)

module.exports = router