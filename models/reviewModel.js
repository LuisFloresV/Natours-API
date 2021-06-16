/* eslint-disable func-names */
const mongoose = require('mongoose')
const Tour = require('./tourModel')

const reviewSchema = new mongoose.Schema({
  review: { type: String, required: [true, 'Review can not be empty'] },
  rating: { type: Number, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now() },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Review must belong to a tour'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to an User'],
  },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})

reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: 'user', select: '_id name' })
  next()
})

reviewSchema.statics.calAverageRatings = async function (tourId) {
  // Select reviews with TourId, sum and calc avg rating
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        nRatings: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ])
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRatings,
      ratingsAverage: stats[0].avgRating,
    })
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    })
  }
}

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne()
  next()
})

reviewSchema.post('save', function () {
  // Points to the current model
  this.constructor.calAverageRatings(this.tour)
})

reviewSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calAverageRatings(this.r.tour)
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review
