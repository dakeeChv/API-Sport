const router = require('express').Router()

const {read, search, create, update, destory} = require('../controller/ClassroomController')

router.get('/classrooms/show', read)
router.get('/classrooms/search', search)
router.post('/classrooms', create)
router.put('/classrooms', update)
router.delete('/classrooms/:id', destory)

module.exports = router