import express from 'express';
import { BOOK } from '../model/bookmodel.js';
const router=express.Router();


// Post request for giving new Books
router.post('/',async (req,res)=>{
    try{
        //checking for error if sender does not give the required field
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            console.log("title/Author/publishYear is not present in the post request")
            return res.send(201).status({message:'Please send valid title author or publisher'})
        }
        //creating of object name newbook which has title,author,publishYear same as what you have given through post request
        const newBook={
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear

        }
        
        //creating new instance of book
        
        const book= await BOOK.create(newBook);
        console.log("Book Created");
        res.status(400).send({message:book})
        
    }
    catch(error){
        console.log("Error while calling /books post api",error);
    }
})


//get request for finding all book data

router.get('/',async (req,res)=>{
    try{
        const books= await BOOK.find({});
        console.log("All Books Data are displayed at response side");
        // console.log(books)
        res.status(200).send({message:{
            length:books.length,
            data:books
        }});
    }
    catch(error){
        console.log("Error while calling get /books api",error)
    }
})

//get request for finding single book with the help of data

router.get('/:id',async (req,res)=>{
    try{
        console.log("hello1")
        const id=req.params.id;
        console.log("id,",id)
        const book= await BOOK.findById(id);
        console.log("Matched id book is displayed on the response side");
        res.status(200).send(book);
    }
    catch(error){
        console.log("Error while calling get /books edit api",error)
    }
})

//put request for updating data of particular id

router.put('/:id',async (req,res)=>{
    try{
        const {id}=req.params;
        const updatedBook=await BOOK.findByIdAndUpdate(id,req.body);
        if(!updatedBook){
            console.log("Book not updated with the id you have given")
            res.status(401).send({message:"Book not updated!!"})
        }
        console.log("Book Successfully Updated!!")
        res.status(201).send({message:updatedBook});
    }   
    catch(error){
        console.log("Error while calling put method while updating books",error);
    }
})

//delete request for deleting some data with the help of particular id

router.delete('/:id',async (req,res)=>{
    try{
        const {id}=req.params;
        const updatedBook=await BOOK.findByIdAndDelete(id);
        if(!updatedBook){
            console.log("Book not deleted due to unmatched id");
            res.send({message:"Unmatched Id book not deleted!!"})
        }
        console.log("Book Deleted Successfully!!");
        res.status(245).send(({message:updatedBook}))
    }
    catch(error){
        console.log("Error while deleting the book api /book/:id",error);
        res.status(201).status({message:"Book Not deleted!!"});
    }
})

export default router;