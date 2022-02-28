import mongoose from "mongoose";
 
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now
    }
})


export const userModel=mongoose.model('users',userSchema)