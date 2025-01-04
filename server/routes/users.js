const express = require("express")
const router = express.Router()
const usersController = require('../controllers/usersController')
const setDefaultUsername = require('../middleware/usersMidlleware');

router.get('/',usersController.getFilterUsers)
router.get('/address/:page',usersController.getUsersWithAddress)
router.get('/:page',usersController.getAllUsers)
router.post('/', setDefaultUsername, usersController.createUser)
router.put('/',usersController.updateUser)
router.delete('/',usersController.deleteUser)

module.exports = router