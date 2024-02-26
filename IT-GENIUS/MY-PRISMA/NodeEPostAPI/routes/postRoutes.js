// สร้าง server ด้วย express
const express = require('express')

// Initialize router
const router = express.Router()

// Import postController
const postController = require('../controllers/postController')

// Get all posts
router.get('/', postController.getAllPosts)

// Create a new post
router.post('/', postController.createPost)

// Get a post by id
router.get('/:id', postController.getPostById)

// Update a post by id
router.put('/:id', postController.updatePostById)

// Delete a post by id
router.delete('/:id', postController.deletePostById)

// Search posts
// http://localhost:3000/api/posts/search?keyword=samit
router.get('/search', postController.searchPosts)

// Export router
module.exports = router
