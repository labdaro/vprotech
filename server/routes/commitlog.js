const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

const commitlogController = require('../controllers/commitlog')
// get all
router.get('/all_commit', checkAuth, commitlogController.getcommitlog_all)
router.post('/insert',checkAuth,commitlogController.insertcommitlog)
module.exports = router