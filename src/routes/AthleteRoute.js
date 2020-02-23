const router = require('express').Router()
const { auth } = require('../middleware/isAuth')

const {read, search, create, update, destory, readByChoice} = require('../controller/AthleteController')

router.get('/athletes/show', read)
router.get('/athletes/choice', readByChoice)
router.get('/athletes/search', search)
router.post('/athletes', auth, create)
router.put('/athletes', update)
router.delete('/athletes/:id', destory)

module.exports = router