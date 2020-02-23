const router = require('express').Router()

const {read, search, create, update, destory} = require('../controller/AthleteController')

router.get('/athletes/show', read)
router.get('/athletes/search', search)
router.post('/athletes', create)
router.put('/athletes', update)
router.delete('/athletes/:id', destory)

module.exports = router