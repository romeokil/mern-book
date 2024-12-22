import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';


function ShowBook() {
  const [book,setbook]=useState([]);
  const [loading,setloading]=useState(false)
  const {id}=useParams();

  useEffect(()=>{
    setloading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response)=>{
        setbook(response.data);
        setloading(false);
      })
      .catch((error)=>{
        console.log("error in Showbook useEffect",error)
        setloading(false)
      })
  },[])
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading?(
        <Spinner/>
      ):(
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id</span>
            <span>{id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Book Title</span>
            <span>{book.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Book Author</span>
            <span>{book.author}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
            <span>{new Date().toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Update time</span>
            <span>{new Date().toString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowBook