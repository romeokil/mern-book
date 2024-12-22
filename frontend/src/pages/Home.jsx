import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'
import { FaSpinner } from "react-icons/fa";



function Home() {

    const [books, setBooks] = useState([]);
    const [loading, Setloading] = useState(false);
    useEffect(() => {
        Setloading(true);
        axios.get('https://mern-book-blw9.onrender.com/books')
            .then((response) => {
                console.log(response.data.message.data);
                setBooks(response.data.message.data);
                Setloading(false);
            })
            .catch((error) => {
                console.log("Error in Home Page", error)
                Setloading(false);
            })
    }, [])

    // useEffect(()=>{
    //     // console.log("books", books)
    // },[books])


    return (
        <>  
            <div className='p-4'>
             <div className='flex justify-between items-center'>
                 <h1 className='text-3xl my-8 '>Book List</h1>
                 <Link to='/books/create'>
                     <MdOutlineAddBox className='text-sky-800 text-4xl ' />
                 </Link>
             </div>
            {loading ? (
                <FaSpinner className='text-9xl text-pink-950 mb-5'/>
            ) : (
                <table className='w-full border-separate border-spacing-2'>
                    <thead>
                        <tr>
                            <th className='border border-slate-600 rounded-md'>No</th>
                            <th className='border border-slate-600 rounded-md'>Title</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>
                                Author
                            </th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>
                                Publish Year
                            </th>
                            <th className='border border-slate-600 rounded-md'>
                                Operations
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => {
                            return <tr key={index} className='h-8'>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {index + 1}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {book.title}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {book.author}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {book.publishYear}
                                </td>

                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`books/details/${book._id}`}>
                                            <BsInfoCircle className='text-2xl text-green-800' />
                                        </Link>
                                        <Link to={`books/edit/${book._id}`}>
                                            <AiOutlineEdit className='text-2xl text-yellow-800' />
                                        </Link>
                                        <Link to={`books/delete/${book._id}`}>
                                            <MdOutlineDelete className='text-2xl text-red-800' />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            )}

        </div>
        </>
        
    )
}

export default Home