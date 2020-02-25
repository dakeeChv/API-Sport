const router = require('express').Router()
const { admin } = require('../middleware/isAdmin')
const {read, create, update, destory} = require('../controller/UserTypeController')

router.get('/type-of-user', admin, read)
router.post('/type-of-user', admin, create)
router.put('/type-of-user', admin, update)
router.delete('/type-of-user/:id', admin, destory)

module.exports = router