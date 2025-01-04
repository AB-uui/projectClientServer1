const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    username:{
        type:String,
        default:null
    },
    email:{
        type:String,
        lowercase:true,
        trim:true,
        required:true
    },
    address:{
        type:String,
        default:"only mail"
    },
    phone:{
        type:String,
        require:true
    }
},
{
    timestamps:true
})

module.exports = mongoose.model("User",usersSchema)
