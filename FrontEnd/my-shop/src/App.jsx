import React from 'react'
import IndexPage from "./components/index"
import Shop from "./components/shop"
import { Routes, Route } from 'react-router-dom'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<IndexPage/>}/>
      <Route path='/shop/*' element={<Shop/>}/>
    </Routes>
  )
}

export default App