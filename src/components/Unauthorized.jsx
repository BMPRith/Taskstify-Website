import React from 'react'
import unauthorize from '../assets/unauthorized.png'
import { Link } from 'react-router-dom'
const Unauthorized = () => {
  return (
    <div className='h-screen flex mx-20 justify-between items-center'>
        <img src={unauthorize} width={500} />
        <p className='w-1/2 text-gray-800 text-2xl font-medium'>Access to this page is restricted, You do not have the necessary permissions to view this content, Please ensure you are logged in with the appropriate account, To log in or sign up, please visit the <Link to='/login'>
                  <span className='text-yellow-500 font-medium hover:text-yellow-800'>Login</span>
                </Link> or <Link to='/signup'>
                  <span className='text-yellow-500 font-medium hover:text-yellow-800'>Signup</span>
                </Link></p>
    </div>
  )
}
export default Unauthorized