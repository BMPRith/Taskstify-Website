import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import landing from '../assets/LandingII.jpg';
import feedback from '../assets/Feedback.jpg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
const LandingPage = () => {
  return (
    <div className="min-h-screen font-rubik">
      <nav className="bg-white border-b-2 border-gray-200 px-20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-yellow-500">
            Taskstify
          </div>
          <div className="flex items-center">
            <Link to="/login">
              <button className="bg-yellow-500 font-medium text-white px-6 py-2 shadow-lg rounded-lg transition duration-300 ease-in-out transform hover:bg-yellow-800 hover:shadow-lg">
                Login
              </button>
            </Link>
            <div className='px-2'></div>
            <Link to="/signup">
              <button className="bg-yellow-500 font-medium text-white px-6 py-2 shadow-lg rounded-lg hover:bg-yellow-800">
                Signup
              </button>
            </Link>
          </div>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-16 flex flex-col items-center md:flex-row">
        <div className="w-full md:w-1/2">
          <img
            src={landing}
            alt="Taskstify"
            className="rounded w-full"
          />
        </div>
        <div className="w-full md:w-1/2 px-8 mt-8 md:mt-0">
          <p className="text-gray-700 text-lg md:text-3xl text-center md:text-left tracking-tighter">
            Taskstify is your ultimate tool for managing tasks and staying organized. Sign up today and start enhancing your productivity with our simple yet powerful task management system.
          </p>
          <Link to="/signup">
              <button className="bg-yellow-500 font-medium text-white px-6 py-2 shadow-lg rounded hover:bg-yellow-800">
                Get Started 
              </button>
            </Link>
        </div>
      </div>
       <footer className="bg-white border-t-2 border-gray-200 py-8">
        <div className="container mx-auto flex justify-center items-center">
          <p className="text-lg text-gray-700">
            &copy; {new Date().getFullYear()} Taskstify. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
