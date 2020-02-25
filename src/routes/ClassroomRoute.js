const router = require('express').Router()
const { admin } = require('../middleware/isAdmin')
const {read, search, create, update, destroy} = require('../controller/ClassroomController')

router.get('/classroom/show', admin, read)
router.get('/classroom/search', admin, search)
router.post('/classroom', admin, create)
router.put('/classroom', admin, update)
router.delete('/classroom/:id', admin, destroy)

module.exports = router