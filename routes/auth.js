import express from "express";
import validator from 'express-validator';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { userModel } from "../model/useModel.js";
import { authenticate } from "../middleware/auth.js";

const { check, validationResult } = validator;

const router=express.Router();

//post api/auth
//logged in
//access ublic
router.post("/",[
    check('email','please enter email').isEmail(),
    check('password',"Pssword is required").not().isEmpty()
],
async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }
    try{
    const {email,password}=req.body

    const user=await userModel.findOne({email})

    //checking for login
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
            })
    }else{
        res.status(400).send("invalid credentials")
    }
}catch(err){
    console.error(err.message)
    res.status(500).send("server error")
}
})

//generate token

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECERT,{expiresIn:'30d',})
}


//get api/auth
//logged in
//access private
router.get("/",authenticate,async (req,res)=>{
    res.send(req.user)
//    try{
//       const user={
//         id:req.user._id,
//         name:req.user.name,
//         email:req.user.email

//     }
//   res.status(200).json(
//       user
//   )
//    }catch(err){
//       console.error(err.message)
//       res.status(500).send('Server error')
//    }
})

export const authRoute=router;