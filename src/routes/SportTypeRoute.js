const router = require('express').Router()
//const { auth } = require('../middleware/isAuth')
const { admin } = require('../middleware/isAdmin')

const { read, create, update, destory } = require('../controller/SportTypeController')

router.get('/type-of-sport', read)
router.post('/type-of-sport', create)
router.patch('/type-of-sport', update)
router.delete('/type-of-sport/:id', destory)

module.exports = router