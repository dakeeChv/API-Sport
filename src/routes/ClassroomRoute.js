const router = require('express').Router()

const {read, search, create, update, destroy} = require('../controller/ClassroomController')

router.get('/classroom/show', read)
router.get('/classroom/search', search)
router.post('/classroom', create)
router.put('/classroom', update)
router.delete('/classroom/:id', destroy)

module.exports = router