const express = require('express')
const morgan = require('morgan')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express()

// Middleware
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
app.use(express.json())
app.use(express.static('./public'))

// Routes
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

//404 Middleware
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl}`
  })
})

module.exports = app