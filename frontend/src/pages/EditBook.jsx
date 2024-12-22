import React,{useState,useEffect} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const EditBook=()=> {

  const [title,settitle]=useState("");
  const [author,setauthor]=useState("");
  const [publishYear,setpublishYear]=useState("");
  const [loading,setloading]=useState(false);
  const Navigate=useNavigate();
  const {id}=useParams();
  useEffect(() => {
    setloading(true);

    axios.get(`http://localhost:5555/books/${id}`)
    .then((response)=>{
      console.log(response.data)
      settitle(response.data.title);
      setauthor(response.data.author);
      setpublishYear(response.data.publishYear);
      setloading(false)
    })
    .catch((error)=>{
      setloading(false);
      alert('Error while calling get api in editBook.Please check console')
      console.log("Error while calling get api in edit book",error)
    })
  }, [settitle,setauthor,setpublishYear])
  
  const handleEditBook=()=>{
    const data={
      title,
      author,
      publishYear
    };
    setloading(true);
    axios
      .put(`http://localhost:5555/books/${id}`,data)
      .then(()=>{
        setloading(false);
        Navigate('/')
      })
      .catch((error)=>{
        setloading(false)
        alert("An error happened.Please Check console")
        console.log("error in EditBook",error)
      })
  }

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading?<Spinner/>:''}
      <div className='flex flex-col  border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input 
          type="text" 
          value={title}
          onChange={(e)=>settitle(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input 
          type="text" 
          value={author}
          onChange={(e)=>setauthor(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>PublishYear</label>
          <input 
          type="text" 
          value={publishYear}
          onChange={(e)=>setpublishYear(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>
        <button className='p-2 bg-sky-300 m-8 ' onClick={handleEditBook}>
          Save Book
        </button>
      </div>
    </div>
  )
}

export default EditBook