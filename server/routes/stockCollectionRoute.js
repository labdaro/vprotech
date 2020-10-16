const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')
const stockCollection = require('../controllers/stockCollection')

// router.get('/all_exports',checkAuth,stockCollection.all_exports)
// router.get('/all_instock',checkAuth,stockCollection.all_instock)
router.post('/all_monthly',checkAuth,stockCollection.all_monthly)
router.get('/all_stock',checkAuth,stockCollection.all_stock)
router.get('/history',checkAuth,stockCollection.history)
module.exports = router