const express = require('express')

const router = express.Router()
const {
  signUp, login, forgotPassword, resetPassword, protect, updatePassword, restrictTo,
} = require('../controllers/authController')
const {
  createUser, deleteUser, getAllUsers, getUser, updateUser, updateMe, deleteMe, getMe,
} = require('../controllers/userController')

// Authentication
router.post('/signup', signUp)
router.post('/login', login)
router.post('/forgotPassword', forgotPassword)
router.patch('/resetPassword/:token', resetPassword)

// Protect all routes after this middleware function
router.use(protect)
router.patch('/updateMyPassword', updatePassword)
router.patch('/updateMe', updateMe)
router.delete('/deleteMe', deleteMe)
router.get('/me', getMe, getUser)

// Only admins
router.use(restrictTo('admin'))
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
