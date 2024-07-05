import React from 'react';
import email from '../../assets/Email.png';

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl md:max-w-xl sm:max-w-lg shadow-xl rounded-lg">
        <div className="m-8 flex flex-col items-center">
          <img src={email} alt="Email Icon" width={50}/>
          <p className="text-4xl text-yellow-500 md:text-3xl sm:text-2xl font-medium text-center mt-4">Forgot Password</p>
          <p className="text-sm font-medium text-gray-700 text-center mt-4">Please Enter Your Email Address</p>
          <div className="max-w-md w-full">
            <div className="mt-8">
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <div className="flex items-center mt-6 justify-center">
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded w-full"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
