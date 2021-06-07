/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRES_IN })

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
  })

  const token = signToken(newUser._id)

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  })
})

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) return next(new AppError('Please provide email and password', 400))

  const user = await User.findOne({ email }).select('+password')
  if (!user || !(await user.correctPassword(password, user.password))) return next(new AppError('Invalid credentials!', 401))

  const token = signToken(user._id)
  res.status(200).json({
    status: 'success',
    token,
  })
})

exports.protect = catchAsync(async (req, res, next) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.replace('Bearer', '').trim()
  }

  if (!token) return next(new AppError('You are not logged in', 401))

  // Converts jwt.verify into an async func
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  // Verify User still exists
  const freshUser = await User.findById({ _id: decoded.id })
  console.log(freshUser)
  if (!freshUser) return next(new AppError('The user no longer exists', 401))

  if (freshUser.changedPasswordAfter(decoded.iat)) return next(new AppError('User changed password recently. Please login again', 401))
  req.user = freshUser
  next()
})
