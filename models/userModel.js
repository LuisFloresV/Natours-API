/* eslint-disable func-names */
/* eslint-disable consistent-return */
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: [8, 'Password must be at least 8 characters'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: true,
    minLength: [8, 'Password must be at least 8 characters'],
    validate: {
      // Only in create and save
      validator(val) {
        return val === this.password
      },
      message: 'Password confirmation should match',
    },
  },
})

userSchema.pre('save', async function (next) {
  // Only run if password was modified
  if (!this.isModified('password')) return next()
  // Hash the password
  this.password = await bcrypt.hash(this.password, 8)
  // Delete the password confirm
  this.passwordConfirm = undefined
  next()
})

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model('User', userSchema)

module.exports = User
