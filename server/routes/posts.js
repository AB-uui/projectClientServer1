const express = require("express")
const router = express.Router()
const postsController = require('../controllers/postsController')

router.get('/',postsController.getPostsByText)
router.get('/:page',postsController.getAllPosts)
router.get('/new/:page',postsController.getNewPosts)
router.post('/',postsController.createNewPost)
router.put('/',postsController.updatePost)
router.delete('/',postsController.deletePost)

module.exports = router