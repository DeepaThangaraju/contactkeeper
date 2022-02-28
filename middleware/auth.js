import jwt from "jsonwebtoken";
import { userModel } from "../model/useModel.js";

export const authenticate=async (req,res,next)=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //get token from header
           token=req.headers.authorization.split(" ")[1]
           //verify token
           const decoded=jwt.verify(token,process.env.JWT_SECERT)
           //get token
           req.user=await userModel.findById(decoded.id).select('-password')
           next()
        }catch(err){
            console.log(err)
            res.status(401)
            throw new Error("Not authorized user")

        }
    }
    if(!token){
            res.status(400)
            throw new Error("Not authorized user")
    }
}