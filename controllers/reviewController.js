const catchAsync = require('../utils/catchAsync')
const Review = require('../models/reviewModel')
const { deleteOne } = require('./handlerFactory')

exports.createReview = catchAsync(async (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId
  if (!req.body.user) req.body.user = req.user.id

  const reviewObj = {
    review: req.body.review,
    rating: req.body.rating,
    tour: req.body.tour,
    user: req.body.user,
  }
  const review = await Review.create(reviewObj)
  res.status(201).json({ status: 'success', data: review })
})

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {}
  if (req.params.tourId) filter = { tour: req.params.tourId }
  const reviews = await Review.find(filter)
  res.status(200).json({ status: 'success', results: reviews.length, data: { reviews } })
})

exports.deleteReview = deleteOne(Review)
