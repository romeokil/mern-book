import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import ShowBook from './pages/ShowBook'
import CreateBook from './pages/CreateBook'
import EditBook from './pages/EditBook'
import DeleteBook from './pages/DeleteBook'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/books/create' element={<CreateBook/>}/>
      <Route path='/books/delete/:id' element={<DeleteBook/>}/>
      <Route path='/books/edit/:id' element={<EditBook/>}/>
      <Route path='/books/details/:id' element={<ShowBook/>}/>
    </Routes>
  )
}

export default App
