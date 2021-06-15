/* eslint-disable func-names */
const mongoose = require('mongoose')

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

const review = mongoose.model('Review', reviewSchema)

module.exports = review