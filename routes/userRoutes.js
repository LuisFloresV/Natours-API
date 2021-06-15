const express = require('express')

const router = express.Router()
const {
  signUp, login, forgotPassword, resetPassword, protect, updatePassword, restrictTo,
} = require('../controllers/authController')
const {
  createUser, deleteUser, getAllUsers, getUser, updateUser, updateMe, deleteMe,
} = require('../controllers/userController')

// Authentication
router.post('/signup', signUp)
router.post('/login', login)

router.post('/forgotPassword', forgotPassword)
router.patch('/resetPassword/:token', resetPassword)
router.patch('/updateMyPassword', protect, updatePassword)
router.patch('/updateMe', protect, updateMe)
router.delete('/deleteMe', protect, deleteMe)

router
  .route('/')
  .get(getAllUsers)
  .post(createUser)

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

module.exports = router
