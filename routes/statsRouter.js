const express = require('express')
const router = express.Router()

const StatsController = require('../controllers/StatsController')

router.get('/', StatsController.get)

module.exports = router
