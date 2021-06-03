const express = require('express')

const router = express.Router()

const {
  createTour, deleteTour, getAllTours, updateTour, getTour, aliasTopTours, getTourStats,
  getMonthlyPlan,
} = require('../controllers/tourController')

// router.param('id', checkId)
router.route('/top-5-cheap').get(aliasTopTours, getAllTours)
router.route('/tours-stats').get(getTourStats)
router.route('/monthly-plan/:year').get(getMonthlyPlan)

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
