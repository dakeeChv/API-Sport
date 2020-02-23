const router = require('express').Router()

const { signup, signin, update, destory, read } = require('../controller/UserController')

router.post('/user/signup', signup)
router.get('/user/signin', signin)
router.patch('/user', update)
router.delete('/user/:id', destory)
router.get('/user/', read)

module.exports = router