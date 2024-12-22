import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose'
import bookRoute from './routes/bookRoute.js'
import cors from 'cors'
import path from 'path'
const app=express();
const __dirname=path.resolve();
app.use(express.json());
app.use(express.static(path.join(__dirname,"/frontend/dist")));
//Middleware for handling cors(Cross Origin Resource Sharing) Policy
app.use(cors());
// app.use({
//     origin:"http://localhost:3000",
//     header:[GET,POST,PUT,DELETE],
//     allowedHeader:[]
// })
app.use(cors({
    origin: 'https://mern-book-blw9.onrender.com',
    credentials: true
  }));
//For testing
app.get('/',(req,res)=>{
    console.log(res);
    res.status(201).send("<h1>Hi this is Rahul</h1>")
})

//Middleware for parsing request body
app.use('/books',bookRoute)
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
})
mongoose.connect(process.env.mongodbURL)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server running at ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("Error while connecting to database",error);
})
