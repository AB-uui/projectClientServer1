const Post = require('../models/Post')
const {format} = require('date-fns')

// לחיצה על כפתור Posts – תגרום להצגת רשימת ה- posts.
// פריטים ברשימה יסודרו לפי מספר ה- id שלהם
const getAllPosts = async (req,res)=>{
     const page = req.params
        const posts = await Post.find().sort({_id:1}).skip(Number(page)*9).limit(9).lean()
        if(!posts?.length){
            return res.status(400).send("no posts found")
        }
        res.json(posts)
}

// יישום הלקוח וקוד השרת יאפשרו הבאת )GE מספר פריטים / לפי קריטריונים מסוימים.
const getNewPosts = async (req,res)=>{
    const page = req.params
    const posts = await Post.find({createdAt:{$gte:format(new Date(),"yyyy-MM-dd  HH:mm:ss")-10}}).sort({_id:1}).skip(Number(page)*9).limit(9).lean()
    if(!posts?.length){
        return res.status(400).send("no posts found")
    }
    res.json(posts)
}

// יישום הלקוח וקוד השרת יאפשרו הוספת )POS פריט - post
const createNewPost = async (req,res)=>{
    const {title,body} = req.body
    if(!title || !body){
        return res.status(400).send("title and body is required")
    }
    const post = await Post.create({title,body})
    if(!post){
        return res.status(400).send("invalid post")
    }
    res.json(`${post.title} updated`)
}

// יישום הלקוח וקוד השרת יאפשרו עדכון  )Pפפריט מסוים תוכן post
const updatePost = async (req,res) => {
    const {_id,title,body} = req.body
    if(!_id || !title || !body){
        return res.status(400).send("all required")
    }
    const post = await Post.findById(_id).exec()
    if(!post){
        return res.status(400).send("post not found")
    }
    post.title = title
    post.body = body
    const updatepost = await post.save()
    res.json(`${updatepost.title} updated`)
}

// יישום הלקוח וקוד השרת יאפשרו מחיקת )DELET פריט בבסיס הנתונים.
const deletePost = async (req,res) => {
    const {_id} = req.body
    if(!_id){
        return res.status(400).send("id is required")
    }
    const post = await Post.findById(_id).exec()
    if(!post){
        return res.status(400).send("post not found")
    }
    const deletepost = await post.deleteOne()
    res.json(`'${post.title}' deleted`)
}

// יישום הלקוח יאפשר לסנן את הPOSTS לפי הטקסט
const getPostsByText = async (req,res)=>{
    const {page = 0,text } = req.query
    if(!text){
        text = ''
    }  
    const posts = await Post.find({$or:[
           {title:{$regex:text,$options:'i'}},
           {body: {$regex:text,$options:'i'}}
         ]}).sort({_id:1}).skip(Number(page)*10).limit(10).lean()
    if(!posts?.length){
        return res.status(400).send("no posts found")
    }
    res.json(posts)
}
module.exports = {getAllPosts,getNewPosts,createNewPost,updatePost,deletePost,getPostsByText}