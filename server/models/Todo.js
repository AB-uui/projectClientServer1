const mongoose = require("mongoose")

const todosSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxLength:20
    },
    tags:{
        type:[String],
        default:["ordinary"]
    },
    completed:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
})

module.exports = mongoose.model("Todo",todosSchema)