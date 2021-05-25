const express = require('express')
const router = express.Router()
const { createTour, deleteTour, getAllTours, updateTour, getTour, aliasTopTours } = require('../controllers/tourController')

// router.param('id', checkId)
router.route('/top-5-cheap')
  .get(aliasTopTours, getAllTours)

router
  .route('/')
  .get(getAllTours)
  .post(createTour)

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)

module.exports = router