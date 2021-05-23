const fs = require('fs')
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

// Route Handlers
exports.checkId = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }
  next()
}

exports.checkBody = (req, res, next) => {
  console.log(req.body)
  const { name, price } = req.body
  if (!name || !price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid Request'
    })
  }
  next()
}

exports.getAllTours = (req, res) => {
  res.status(200).json({ status: 'success', results: tours.length, data: { tours } })
}

exports.getTour = (req, res) => {
  const id = req.params.id * 1
  const tour = tours.find(el => el.id === id)
  res.status(200).json({ status: 'success', data: { tour } })
}

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1
  const newTour = Object.assign({ id: newId }, req.body)
  tours.push(newTour)
  fs.writeFile('/api/v1/tours', JSON.stringify(tours), err => {
    res.status(201).json({ status: 'success', data: { tour: newTour } })
  })
}

exports.updateTour = (req, res) => {
  res.status(200).json({ status: 'success', data: { tour: '<Foo>' } })
}

exports.deleteTour = (req, res) => {
  res.status(204).json({ status: 'success', data: null })
}