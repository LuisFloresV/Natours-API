const Tour = require('../models/tourModel')

// Route Handlers
exports.getAllTours = async (req, res) => {
  try {
    //Build Query
    const queryObj = { ...req.query }
    const excludedFields = ['page', 'sort', 'limit', 'fields']
    excludedFields.forEach((el) => delete queryObj[el])
    const query = Tour.find(queryObj)

    //Execute Query
    const tours = await query

    //Send response
    res.status(200).json({ status: 'success', results: tours.length, data: { tours } })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    })
  }
}

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)
    res.status(200).json({ status: 'success', data: { tour } })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: 'Data not found'
    })
  }
}

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body)
    res.status(201).json({ status: 'success', data: { tour: newTour } })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    })
  }
}

exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour
      }
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    })
  }
}

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id)
    res.status(204).json({ status: 'success', data: null })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    })
  }
}