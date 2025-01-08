const User = require('../models/User')


// לחיצה על כפתור Users –תגרום להצגת רשימת ה- users.
// פריטים ברשימה יסודרו לפי מספר ה- id שלהם
const getAllUsers = async (req,res)=>{
    const {page} = req.params
    const users = await User.find().sort({_id:1}).skip(Number(page)*9).limit(9).lean()

    if(!users){
        return res.status(400).send("no users found")
    }
    else if(users.length==0){
        return res.send("no users found")

    }
    res.json(users)
}

// יישום הלקוח וקוד השרת יאפשרו הבאת )GE מספר משתמשים/ לפי קריטריונים מסוימים.
//משתמשים שיש להם כתובת
const getUsersWithAddress = async (req,res) => {
    const page = req.params
    const usersWithAddress = await User.find({address:{$ne:"only mail"}}).sort({_id:1}).skip(Number(page)*9).limit(9).lean()
    if(!usersWithAddress?.length){
        return res.status(400).send("no users With Address found")
    }
    res.json(usersWithAddress)
}

// יישום הלקוח וקוד השרת יאפשרו הוספת )POS משתמש- user
const createUser = async (req,res)=>{
    const {name, username, email, address, phone} = req.body
    if(!name || !email || !phone){
        return res.status(400).send("name & email & phone is required")
    }
    const user = await User.create({name, username, email, address, phone})
    console.log(user);
    
    if(!user){
        return res.status(400).send("invalid user")
    }
    // res.status(201).json(user)
    res.json(`${user.name} add`)

}

// יישום הלקוח וקוד השרת יאפשרו עדכון )PU תוכן משתמש מסוים
const updateUser = async (req,res) => {
    const {_id,name, username, email, address, phone} = req.body
    if(!_id || !name || !email || !phone){
        return res.status(400).send("id & name & email & phone is required")
    }
    const updateduser = await User.findByIdAndUpdate(_id,{name, username, email, address, phone},{ new: true, runValidators: true })
    if(!updateduser){
        return res.status(400).send("user not found")
    }
    res.json(`${updateduser.name} updated`)
}

// יישום הלקוח וקוד השרת יאפשרו מחיקת )DELET משתמש מבסיס הנתונים.
const deleteUser = async (req,res)=>{
    const {_id} = req.body
    console.log(_id);
    
    if(!_id){
        return res.status(400).send("id is required")
    }
    const user = await User.findByIdAndDelete(_id)
    if(!user){
        return res.status(400).send("user not found")
    }
    res.json(`'${user.name}' deleted`)
}

// יישום הלקוח יאפשר לסנן את המשתמשים לפי שם או מייל או טלפון או u
const getFilterUsers = async (req,res)=>{
    const {page = 0,text } = req.query
    if(!text){
        text = ''
    }  
    const users = await User.find({$or:[
           {name:{$regex:text,$options:'i'}},
           {username: {$regex:text,$options:'i'}},
           {mail: {$regex:text,$options:'i'}},
           {phone: {$regex:text,$options:'i'}}
         ]}).sort({_id:1}).skip(Number(page)*9).limit(9).lean()
    if(!users?.length){
        return res.status(400).send("no users found")
    }
    res.json(users)
}

module.exports = {getAllUsers,getUsersWithAddress,createUser,updateUser,deleteUser,getFilterUsers}