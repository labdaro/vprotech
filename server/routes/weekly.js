
const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')
const weeklyPlate = require('../controllers/weekly')

const { route } = require('./commitlog')
//Router the all_weekly
router.get('/all_weekly',checkAuth,weeklyPlate.all_weekly)
router.post('/out',checkAuth,weeklyPlate.out_plate)
router.post('/in',checkAuth,weeklyPlate.in_plate)

router.get('/range',checkAuth,weeklyPlate.range_day)

module.exports = router     