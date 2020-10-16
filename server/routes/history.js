const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

const historyController = require('../controllers/history')
// get all
router.get('/all_history', checkAuth, historyController.history)
router.post('/import_export', checkAuth, historyController.checkImportExport)

module.exports = router