const mongoose=require("mongoose")
const ObjectId = require('mongodb').ObjectId;

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        max:50,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    role:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'roles',
        required:true, 
        default:new ObjectId("61b62ffdb48e7e66738ec8d3")
    },
    phonenumber:{
        type:String,
        default:""

    },
    email:{
        type:String,
        required:true
    },
    location:{
        type:String,
        default:""
    },
    dateofbirth:{
        type:Date,
        default:new Date()
    },
    name:{
        type:String,
        default:""
    },
    vip:{
        type:Boolean,
        default:false
    },
    facebook:{
        type:String,
        default:""
    },
    ticketactivated:{
        type:Date,
        default:new Date()
    },
    ticketexpired:{
        type:Date,
        default:new Date()
    }
})

module.exports=mongoose.model("User",userSchema)