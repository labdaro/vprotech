const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

const collectionController = require('../controllers/collection')
// get all
router.get('/all_students', checkAuth, collectionController.all_student)
router.post('/insert_student', checkAuth, collectionController.insert_student)
module.exports = router