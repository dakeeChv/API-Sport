const router = require('express').Router()
// const { admin } = require('../middleware/isAdmin')
const { signup, signin, update, destory, read } = require('../controller/UserController')

router.post('/user/signup', signup)
router.get('/user/signin', signin)
router.patch('/user', update)
router.delete('/user/:id', destory)
router.get('/user/', read)

module.exports = router

/**Admin: CEIT-Software
 * Password: 123456789
 * 
 * User: 3COM1
 * password: 123456789
 */