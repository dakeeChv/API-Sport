const router = require('express').Router()
const { auth } = require('../middleware/isAuth')

const {read, search, create, update, destory, readByChoice} = require('../controller/AthleteController')

router.get('/athlete/show', auth, read)
router.get('/athlete/choice', auth, readByChoice)
router.get('/athlete/search', auth, search)
router.post('/athlete', auth, create)
router.put('/athlete', auth, update)
router.delete('/athlete/:id', auth, destory)

module.exports = router