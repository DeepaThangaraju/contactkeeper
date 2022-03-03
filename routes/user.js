import express from "express";
import { userModel } from "../model/useModel.js";
import validator from 'express-validator';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

const { check, validationResult } = validator;

const router=express.Router();

//post api/users
//register user
//access public
router.post("/",[
    check('name','name is required').not().isEmpty(),
    check('email','Please include valid email').isEmail(),
    check('password',"please Enter strong password").isLength({min:6})
]
,async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.status(400)
        throw new Error("Invalid Credentials")
    }
    const {name,email,password}=req.body;
    try{
      let user=await userModel.findOne({email})
      if(user){
          res.status(400)
          throw new Error("User Already exist")
      }
      user=new userModel({
          name,
          email,
          password
      });
      const salt=await bcrypt.genSalt(10)
      user.password=await bcrypt.hash(password,salt)

      await user.save()
      res.send(user)
      
    }catch(error){
       
       res.status(500)
       throw new Error("Server Error")
    }
})




export const userRoute=router;