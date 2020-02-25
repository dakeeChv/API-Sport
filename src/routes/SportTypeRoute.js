const router = require('express').Router()
//const { auth } = require('../middleware/isAuth')
const { admin } = require('../middleware/isAdmin')

const { read, create, update, destory } = require('../controller/SportTypeController')

router.get('/type-of-sport', admin, read)
router.post('/type-of-sport', admin, create)
router.patch('/type-of-sport', admin, update)
router.delete('/type-of-sport/:id', admin, destory)

module.exports = router