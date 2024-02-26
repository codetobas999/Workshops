// สร้าง server ด้วย express
const express = require('express')

// Initialize router
const router = express.Router()

// Import userController
const userController = require('../controllers/userController')

// Get all users
router.get('/', userController.getAllUsers)

// Create a new user
router.post('/', userController.createUser)

// Get a user by id
router.get('/:id', userController.getUserById)

// Update a user by id
router.put('/:id', userController.updateUserById)

// Delete a user by id
router.delete('/:id', userController.deleteUserById)

// Export router
module.exports = router