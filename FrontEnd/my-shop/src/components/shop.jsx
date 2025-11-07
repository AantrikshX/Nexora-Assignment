import React from 'react'
import NavBar from './navbar'
import Items from "./items"
import Cart from "./cart"
import BillingForm from "./billing"
import { Routes, Route } from 'react-router-dom'
const shop = () => {
  return (
    <>
    <div className='w-full overflow-x-hidden relative  bg-zinc-900' >
      <NavBar />
      <div className="p-5">
        <Routes>
          <Route path="/" element={<Items />} />
          <Route path='/cart' element={<Cart/>}/>
          <Route path="/checkout" element={<BillingForm />} />
        </Routes>
      </div>
      </div>
    </>
    
    

  )
}

export default shop