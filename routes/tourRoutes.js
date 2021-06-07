const express = require('express')

const router = express.Router()

const {
  createTour, deleteTour, getAllTours, updateTour, getTour, aliasTopTours, getTourStats,
  getMonthlyPlan,
} = require('../controllers/tourController')

const { protect, restrictTo } = require('../controllers/authController')

// router.param('id', checkId)
router.route('/top-5-cheap').get(aliasTopTours, getAllTours)
router.route('/tours-stats').get(getTourStats)
router.route('/monthly-plan/:year').get(getMonthlyPlan)

router
  .route('/')
  .get(protect, getAllTours)
  .post(createTour)

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour)

module.exports = router
