const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
    {
        id:{
            type:Number
        },
        name: { 
            type: String
        },
        
        status: { 
            type: Boolean,
            default: true
        },
        note:{
            type: String,
            default:""

        },
        desc:{
            type: String,
            default:""
        },
        priceticket:{
            type: Number,
            default:0
        },
        type:{
            type:String

        }
    }
)
module.exports=mongoose.model("Game",gameSchema)