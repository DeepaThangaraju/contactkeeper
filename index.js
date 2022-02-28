import express from "express";
import { userRoute } from "./routes/user.js";
import { contactRoute } from "./routes/contact.js";
import { authRoute } from "./routes/auth.js";
import { connectDB } from "./config/db.js";
import dotenv from"dotenv";
const app=express();
dotenv.config()

connectDB()

//init middleware
app.use(express.json())

const PORT=process.env.PORT || 5000;

app.get("/",(req,res)=>{
   res.send("Hello World")
})


app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/contact",contactRoute)


app.listen(PORT,()=>console.log("App started in",PORT))