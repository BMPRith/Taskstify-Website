import React from 'react'
import notfound from '../assets/error-404.png' 
const NotFound = () => {
  return (
    <div className='h-screen flex mx-20 justify-between items-center'>
        <img src={notfound} width={500} />
        <div className='w1/2'>
        <p className=' text-red-500 text-9xl py-10 text-center font-medium'>Error 404</p>
        <p className=' text-gray-800 text-4xl text-center font-medium'>The Page You Are Looking For Doesn't Exist.</p>
        </div>
    </div>
  )
}

export default NotFound