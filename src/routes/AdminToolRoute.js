const router = require('express').Router()
const { admin } = require('../middleware/isAdmin')

const {read, search, create, update, destory, readByChoice} = require('../controller/AdminTool')

router.get('/admin/show', admin, read)
router.get('/admin/choice', admin, readByChoice)
router.get('/admin/search', admin, search)
router.post('/admin', admin, create)
router.put('/admin', admin, update)
router.delete('/admin/:id', admin, destory)

module.exports = router