const router = require('express').Router()

const {read, create, update, destory} = require('../controller/UserTypeController')

router.get('/types-of-user', read)
router.post('/types-of-user', create)
router.put('/types-of-user', update)
router.delete('/types-of-user/:id', destory)

module.exports = router