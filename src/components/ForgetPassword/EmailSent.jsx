import React from 'react';
import emailIcon from '../../assets/Email.png';
import { Link } from 'react-router-dom';
import back from '../../assets/back-button.png';

const EmailSent = () => {
  const handleOpenEmail = () => {
    window.location.href = 'https://mail.google.com/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl md:max-w-xl sm:max-w-lg shadow-xl rounded-lg">
        <div className="m-8 flex flex-col items-center">
          <img src={emailIcon} alt="Email Icon" width={50}/>
          <p className="text-4xl text-yellow-500 md:text-3xl sm:text-2xl font-medium text-center mt-4">Check Your Email</p>
          <p className="text-sm font-medium text-gray-800 text-center mt-4">We Have Already Sent The Password Reset Link To <span className='text-yellow-500 font-medium text-sm'></span></p>
          <div className="max-w-md w-full">
            <div className="flex items-center mt-6 justify-center">
              <button
                type="button" 
                className="bg-yellow-500 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded w-full"
                onClick={handleOpenEmail} 
              >
                Open Email
              </button>
            </div>
            <div className='text-gray-800 flex justify-center items-center'>
              <Link to={'/login'} className='flex justify-between mt-5 hover:underline'>
                <img src={back} width={20} alt="Back Button"/>
                <p className='text-gray-800 font-medium text-sm pl-1'>Back To Login</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSent;
