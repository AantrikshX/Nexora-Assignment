import React from 'react'
import { Link } from 'react-router-dom'

const navbar = () => {
  const handleLogout = async () => {
  try {
    await fetch('/api/logout', {
      method: 'GET',
      credentials: 'include', 
    });
    window.location.href = '/'; 
  } catch (err) {
    console.error('Logout failed:', err);
  }
};

  return (
    
        <div className='navbar w-full sm:h-25 border-b border-zinc-700 rounded-b-xl shadow-2xl justify-between flex py-5 px-10' >
            <div><h1 className='text-white font-bold shadow text-xl sm:text-4xl' >Nexora</h1></div>
            <div className='flex mt-3 font-medium sm:text-xl gap-3 sm:gap-10 text-white' >
              
                <Link to="/shop">Home</Link>
                <Link to="/shop/cart">Cart</Link>
                <button onClick={handleLogout} className=' cursor-pointer  h-0 text-red-500'>Logout</button>
            </div>
            
        </div>
    
  )
}

export default navbar