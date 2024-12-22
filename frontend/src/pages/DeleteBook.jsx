import React,{useState} from 'react'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'

function DeleteBook() {

  const [loading,setloading]=useState(false);
  const Navigate=useNavigate();
  const {id}=useParams();

  // const handleDeleteBook=()=>{
  //   setloading(true)
  //   axios.delete(`https://mern-book-blw9.onrender.com/books/${id}`)
  //   .then(()=>{
  //     setloading(false)
  //     Navigate('/');
  //   })
  //   .catch((error)=>{
  //     setloading(false)
  //     alert('Error while calling delete api calling Please check console')
  //     // console.log("Error while calling delete api calling",error)
  //         Navigate('/')
  //   })
  // }

  const handleDeleteBook=async ()=>{
        try{
          setloading(true);
          await axios.delete(`https://mern-book-blw9.onrender.com/books/${id}`);
          setloading(false);
          Navigate('/');
        }
        catch(error){
          setloading(false);
          alert("Error while calling delete api calling ",error);
          Navigate('/');
        }
  }

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading?"loading.....":''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-3xl'>Are You Sure You want to delete this book?</h3>
        <button className='p-4 bg-red-500 text-white m-8 w-full text-xl' onClick={handleDeleteBook}>
          Yes, Delete It
        </button>
      </div>
    </div>
  )
}

export default DeleteBook