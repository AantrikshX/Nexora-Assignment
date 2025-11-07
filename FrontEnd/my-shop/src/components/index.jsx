import React from 'react'
import Signup from "./signup"
import Login from "./login"
const index = () => {
  return (
    <div className='w-full h-300 sm:h-screen flex justify-center flex-wrap items-center bg-zinc-800' >
        <div className='formcontainer flex justify-around items-center w-350 gap-15 sm:gap-0 flex-wrap ' >
            <Signup/>
            <div className='text-4xl text-white font-bold ' >OR</div>
            <Login/>
        </div>
    </div>
  )
}

export default index