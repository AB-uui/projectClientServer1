const mongoose = require("mongoose")

const postsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxLength:20
    },
    body:{
        type:String,
        required:true,
        minLength:10
    }
},
{
    timestamps:true
})

module.exports = mongoose.model("Post",postsSchema)