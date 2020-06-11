const router = require('express').Router()
// const { auth } = require('../middleware/isAuth')

const {read, search, create, update, destory, readByChoice} = require('../controller/AthleteController')

router.get('/athlete/show', read)
router.get('/athlete/choice', readByChoice)
router.get('/athlete/search', search)
router.post('/athlete', create)
router.put('/athlete', update)
router.delete('/athlete/:id', destory)

module.exports = router