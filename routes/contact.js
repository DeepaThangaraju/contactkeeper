import express from "express";
import { userModel } from "../model/useModel.js";
import validator from 'express-validator';
import { authenticate } from "../middleware/auth.js";
import {contactModel} from "../model/contactModel.js"

const { check, validationResult } = validator;

const router=express.Router();

//get api/contacts
//get all contacts
//access private
router.get("/",authenticate,async(req,res)=>{
    try{
        const contacts=await contactModel.find({user:req.user.id}).sort({date:-1})
        res.json(contacts)
    }catch(err){
          console.error(err.message)
          res.status(500).send("server Error")
    }
})

//post api/contacts
//add contacts
//access private
router.post("/",[authenticate,[
    check('name','Please enter name').not().isEmpty()
]],async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }
    const {name,email,phone,type}=req.body;

    try{
        const newContact=new contactModel({
            name,
            email,
            phone,
            type,
            user:req.user.id
        })

        const contact=await newContact.save()

        res.json(contact)

    }catch(err){
   console.error(err.message)
   res.status(500).send("Server error")
    }
})

//put api/contacts
//update contacts
//access private
router.put("/:id",authenticate,async (req,res)=>{
    const {name,email,phone,type}=req.body
    const updatedContact={}
    if(name)updatedContact.name=name
    if(email)updatedContact.email=email
    if(phone)updatedContact.phone=phone
    if(type)updatedContact.type=type

    try{
        let contact=await contactModel.findById(req.params.id)

        if(!contact){
            res.status(404).json({msg:"Contact not found"})
        }

        //make sure user owns contact
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg:"not authorized iser"})
        }
      
        contact=await contactModel.findByIdAndUpdate(req.params.id,
            {
                $set:updatedContact
            },
            {
                new:true
            });
            res.json(contact)

    }catch(err){
        console.error(err.message)
   res.status(500).send("Server error")
    }
})

//delete api/contacts
//delete contacts
//access private
router.delete("/:id",authenticate,async(req,res)=>{
    try{
        let contact=await contactModel.findById(req.params.id)

        if(!contact){
            res.status(404).json({msg:"Contact not found"})
        }

        //make sure user owns contact
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg:"not authorized iser"})
        }
      
        await contactModel.findByIdAndRemove(req.params.id);
          
        res.json({msg:'contact removed'})
    }catch(err){
        console.error(err.message)
   res.status(500).send("Server error")
    }
})
export const contactRoute=router;