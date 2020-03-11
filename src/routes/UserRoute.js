const router = require('express').Router()
const { admin } = require('../middleware/isAdmin')
const { signup, signin, update, destory, read } = require('../controller/UserController')

router.post('/user/signup', admin, signup)
router.get('/user/signin', signin)
router.patch('/user', admin, update)
router.delete('/user/:id', admin, destory)
router.get('/user/', admin, read)

module.exports = router

/**Admin: CEIT-Software
 * Password: 123456789
 * 
 * User: 3COM1
 * password: 123456789
 */