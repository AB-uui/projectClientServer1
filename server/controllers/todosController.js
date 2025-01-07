const Todo = require('../models/Todo')


// יישום הלקוח וקוד השרת יאפשרו הוספת )POS רשומה חדשה עם הנתונים הרלוונטיים.
const createNewTodo = async (req,res)=>{
    const {title,tags,completed} = req.body
    if(!title){
        return res.status(400).send("title is required")
    }
    const todo = await Todo.create({title,tags,completed})
    if(!todo){
        return res.status(400).send("invalid todo")
    }
    res.json(`${todo.title} add`)
}

// לחיצה על כפתור Todos – תגרום להצגת רשימת ה- todos.
// פריטים ברשימה יסודרו לפי מספר ה- id
const getAllTodos = async (req,res)=>{
    // const {page=0} = req.query
    const {page} = req.params
    const todos = await Todo.find().sort({_id:1}).skip(Number(page)*9).limit(9).lean()
    if(!todos?.length){
        return res.status(400).send("no todos found")
    }
    res.json(todos)
}

// יישום הלקוח וקוד השרת יאפשרו קבלת )GE מספר רשומות לפי קריטריונים ו/או שאילתות.
//משימות שלא הושלמו
const getUncompletedTodos = async (req,res) => {
    const {page} = req.params
    const uncompletedTodos = await Todo.find({completed:false}).sort({_id:1}).skip(Number(page)*9).limit(9).lean()
    if(!uncompletedTodos?.length){
        return res.status(400).send("no todos found")
    }
    res.json(uncompletedTodos)
}

// יישום הלקוח וקוד השרת יאפשרו עדכון ר )שרשומה מסוימת כותרת  מצב הביצוע  וכו'.
const updateTodo = async (req,res) => {
    const {_id,title,tags,completed} = req.body
    if(!_id || !title){
        return res.status(400).send("id & title is required")
    }
    const todo = await Todo.findById(_id).exec()
    if(!todo){
        return res.status(400).send("todo not found")
    }
    todo.title = title
    todo.tags = tags
    todo.completed = completed
    const updatetodo = await todo.save()
    res.json(`${updatetodo.title} updated`)
}

// יישום הלקוח יאפשר סימון משימה שבוצעה )PU - רק לשדה complete
const updateCompleted = async (req,res) => {
    const {_id} = req.body
    if(!_id){
        return res.status(400).send("id is required")
    }
    const todo = await Todo.findById(_id).exec()
    if(!todo){
        return res.status(400).send("todo not found")
    }
    if(todo.completed===true){
        return res.status(400).send("The task is already marked as completed.")
    }
    todo.completed = true
    const updatetodo = await todo.save()
    res.json(`${updatetodo.title} marked as completed`)
}

// יישום הלקוח וקוד השרת יאפשרו מחיקת )DELET פריט בבסיס הנתונים.
const deleteTodo = async (req,res) => {
    const {_id} = req.body
    if(!_id){
        return res.status(400).send("id is required")
    }
    const todo = await Todo.findById(_id).exec()
    if(!todo){
        return res.status(400).send("todo not found")
    }
    const deletetodo = await todo.deleteOne()
    res.json(`'${todo.title}' deleted`)
}

// יישום הלקוח יאפשר לסנן את המשימות לפי הטקסט
const getTodosByText = async (req,res)=>{
    const {page = 0,text } = req.query
    if(!text){
        text = ''
    }  
    const todos = await Todo.find({$or:[
           {title:{$regex:text,$options:'i'}},
           {tags:{$elemMatch:{$regex:text,$options:'i'}}}
         ]}).sort({_id:1}).skip(Number(page)*10).limit(10).lean()
    if(!todos?.length){
        return res.status(400).send("no todos found")
    }
    res.json(todos)
}

module.exports = {createNewTodo,getAllTodos,getUncompletedTodos,updateTodo,updateCompleted,deleteTodo,getTodosByText}