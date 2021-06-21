const express = require('express')
const path = require('path')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')
const viewRouter = require('./routes/viewRoutes')
const reviewRouter = require('./routes/reviewRoutes')
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')

const app = express()

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// Serving static files
app.use(express.static(path.join(__dirname, 'public')))

// Set security HTTP headers
app.use(helmet())
// Middleware

// Dev logs
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

// Limiting request from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again later',
})

app.use('/api', limiter)

// Body parser
app.use(express.json({ limit: '10kb' }))

// Data sanitization for NoSql query inject
app.use(mongoSanitize())

// Data sanitization against XSS
app.use(xss())

// Parameter pollution
app.use(hpp({
  whitelist: ['duration', 'ratingsAverage', 'ratingsQuantity', 'maxGroupSize', 'price', 'difficulty'],
}))

// Routes
app.use('/', viewRouter)
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/reviews', reviewRouter)

// 404 Middleware
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404))
})

app.use(globalErrorHandler)

module.exports = app
