const express = require('express')

const router = express.Router()
const { signUp, login } = require('../controllers/authController')
const {
  createUser, deleteUser, getAllUsers, getUser, updateUser,
} = require('../controllers/userController')

// Authentication
router.post('/signup', signUp)
router.post('/login', login)

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
