const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')
const exportController = require('../controllers/export_controller')

router.get('/all_exports',checkAuth,exportController.all_export)
router.post('/insert',checkAuth,exportController.insert_export)
router.post('/all',checkAuth,exportController.all_monthly)
module.exports = router