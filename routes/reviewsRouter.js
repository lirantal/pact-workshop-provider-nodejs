const express = require('express')
const router = express.Router()

const ReviewsController = require('../controllers/ReviewsController')

router.get('/', ReviewsController.get)

module.exports = router
