import mongoose from "mongoose";
import { userModel } from "./useModel.js";

const contactSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: userModel.modelName,
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String
    },
    type:{
        type:String,
        default:'personal'
    },
    date:{
        type:Date,
        default:Date.now
    }
})

export const contactModel=mongoose.model('contact',contactSchema)