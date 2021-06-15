const express = require('express')

const router = express.Router()
const {
  createTour, deleteTour, getAllTours, updateTour, getTour, aliasTopTours, getTourStats,
  getMonthlyPlan,
} = require('../controllers/tourController')
const reviewRouter = require('./reviewRoutes')
const { protect, restrictTo } = require('../controllers/authController')

// Nested Routes
router.use('/:tourId/reviews', reviewRouter)
// router.param('id', checkId)
router.route('/top-5-cheap').get(aliasTopTours, getAllTours)
router.route('/tours-stats').get(getTourStats)
router.route('/monthly-plan/:year').get(protect, restrictTo('admin', 'lead-guide', 'guide'), getMonthlyPlan)

router
  .route('/')
  .get(getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide'), createTour)

router
  .route('/:id')
  .get(getTour)
  .patch(protect, restrictTo('admin', 'lead-guide'), updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour)

module.exports = router
