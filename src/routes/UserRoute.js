const router = require('express').Router()

const { signup, signin, update, destory } = require('../controller/UserController')

router.post('/user/signup', signup)
router.get('/user/signin', signin)
router.patch('/user', update)
router.delete('/user/:id', destory)

module.exports = router