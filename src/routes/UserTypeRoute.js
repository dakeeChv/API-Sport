const router = require('express').Router()

const {read, create, update, destory} = require('../controller/UserTypeController')

router.get('/type-of-user', read)
router.post('/type-of-user', create)
router.put('/type-of-user', update)
router.delete('/type-of-user/:id', destory)

module.exports = router