const Review = require('../models/reviewModel')
const {
  deleteOne, updateOne, createOne, getOne, getAll,
} = require('./handlerFactory')

exports.createReview = createOne(Review)
exports.getAllReviews = getAll(Review)
exports.deleteReview = deleteOne(Review)
exports.updateReview = updateOne(Review)
exports.getReview = getOne(Review)

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId
  if (!req.body.user) req.body.user = req.user.id
  next()
}
