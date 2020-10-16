const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')
const importController = require('../controllers/import_controller')

router.get('/all_imports',checkAuth,importController.all_import)
router.post('/insert',checkAuth,importController.insert_import)
module.exports = router