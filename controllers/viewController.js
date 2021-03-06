const Tour = require('../models/tourModel')
const catchAsync = require('../utils/catchAsync')

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get all the tour data
  const tours = await Tour.find()
  // 2) Build template
  // 3) Render template using the tour data from step 1
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  })
})

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) get the data, for the requested tour(reviews, guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({ path: 'reviews', fields: 'review rating user' })
  // 2) Build template
  // 3) Render template using the data from 1
  res.status(200).render('tour', {
    title: tour.name,
    tour,
  })
})
