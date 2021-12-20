const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
    {
        id:{
            type:Number
        },
        name: { 
            type: String
        },
        slug: { 
            type: String
        }
    }
)
module.exports=mongoose.model("Role",roleSchema)