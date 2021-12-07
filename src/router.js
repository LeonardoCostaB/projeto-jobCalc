const express = require('express')
const profileController = require('./controller/profilerController')
const jobController = require('./controller/jobController')
const dashboardController = require('./controller/dashboardController')

const router = express.Router()

router.get('/', dashboardController.index)
router.get('/job', jobController.create)
router.get('/job/:id', jobController.show)
router.get('/profile', profileController.index)

router.post('/job', jobController.save)
router.post('/job/:id', jobController.update)
router.post('/job/delete/:id', jobController.delete)
router.post('/profile', profileController.update)

module.exports = router