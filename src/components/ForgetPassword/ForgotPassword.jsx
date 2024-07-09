import React, { useContext, useState } from 'react';
import key from '../../assets/Key.png';
import { Link, useNavigate } from 'react-router-dom';
import back from '../../assets/back-button.png';
import { AuthContext } from '../../context/AuthContext';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { forgotPassword } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await forgotPassword(email);
        navigate('/email-sending');
    } catch (error) {
        if (error.message === 'Password reset link expired') {
        navigate('/expired');
        } 
    }
};
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl md:max-w-xl sm:max-w-lg shadow-xl rounded-lg">
        <div className="m-8 flex flex-col items-center">
          <img src={key} alt="Email Icon" width={50}/>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow border rounded w-full py-2 px-3 bg-white text-gray-700"
              />
            </div>
            <div className="flex items-center mt-6 justify-center">
              <button
              onClick={handleSubmit}
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded w-full"
              >
                Send
              </button>
            </div>
            <div className='text-gray-800 flex justify-center items-center'>
              <Link to={'/login'} className='flex justify-between mt-5 hover:underline'>
              <img src={back} width={20}/>
              <p className='text-gray-800 font-medium text-sm pl-1'>Back To Login</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
