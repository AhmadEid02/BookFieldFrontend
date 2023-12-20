import React, { useState } from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import NavBar from './componts/NavBar'
import { Home } from './pages/Home'

import axios from "axios"
import Book from './pages/Book'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'


const App = () => {

  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/booking/:id' element={<Book/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App