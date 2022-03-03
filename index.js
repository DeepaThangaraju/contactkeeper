import express from "express";
import { userRoute } from "./routes/user.js";
import { contactRoute } from "./routes/contact.js";
import { authRoute } from "./routes/auth.js";
import { connectDB } from "./config/db.js";
import dotenv from"dotenv";
import path from "path"
const app=express();
dotenv.config()

connectDB()

//init middleware
app.use(express.json())

const PORT=process.env.PORT || 5000;



app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/contact",contactRoute)

if(process.env.NODE_ENV === "production"){
app.use(express.static('client/build'))
app.get("*",(req,res)=>res.sendFile(path.resolve(
   __dirname,'client','build','index.html'
)))
}


app.listen(PORT,()=>console.log("App started in",PORT))