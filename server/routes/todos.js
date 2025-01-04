const express = require("express")
const router = express.Router()
const todosController = require('../controllers/todosController')

router.get('/Uncompleted',todosController.getUncompletedTodos)
router.get('/ByText',todosController.getTodosByText)
router.get('/:page',todosController.getAllTodos)
router.post('/',todosController.createNewTodo)
router.put('/',todosController.updateTodo)
router.put('/Completed',todosController.updateCompleted)
router.delete('/',todosController.deleteTodo)

module.exports = router