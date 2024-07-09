import React from 'react';
import reset from '../../assets/Reset.png';
import { useNavigate } from 'react-router-dom';


const PasswordVerified = () => {
  const navigate = useNavigate();
  const handleNavigate = () =>{
    navigate('/login')
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl md:max-w-xl sm:max-w-lg shadow-xl rounded-lg">
        <div className="m-8 flex flex-col items-center">
          <img src={reset} alt="Email Icon" width={50}/>
          <p className="text-4xl text-yellow-500 md:text-3xl sm:text-2xl font-medium text-center mt-4">Account Verified</p>
          <p className="text-sm font-medium text-gray-700 text-center mt-4">Your Account Has Been Successfully Verify, Click Below To Login.</p>
          <div className="max-w-md w-full">
            <div className="flex items-center mt-6 justify-center">
              <button
                onClick={handleNavigate}
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded w-full"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordVerified;
