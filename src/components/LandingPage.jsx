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
      <div className="container mx-auto px-4 py-16 flex flex-col items-center md:flex-row">
      <div className="w-full md:w-1/2 px-8 mt-8 md:mt-0">
          <p className="text-gray-800 text-lg md:text-3xl text-center md:text-left tracking-tighter">
            Give Us Feedback
          </p>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
            }}
            validationSchema={Yup.object({
              email: Yup.string().email('Please Provide Your Email').required('Email Is Required'),
              message: Yup.string().required('Message Is Required'),
            })}
          >
            <Form className="mt-8">
              <div className="mb-8">
                <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="shadow border bg-white rounded w-full py-2 px-3 text-gray-700"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 font-medium text-sm mt-1" />
              </div>
              <div className="mb-8">
              <label htmlFor="message" className="block text-gray-700 text-sm font-semibold mb-2">
                  Message
                </label>
                <Field
                  as="textarea"
                  id="message"
                  name="message"
                  className="shadow border bg-white rounded w-full py-2 px-3 text-gray-700"
                />
                <ErrorMessage name="message" component="div" className="text-red-500 font-medium text-sm mt-1" />
              </div>
            </Form>
          </Formik>
        </div>
        <div className="w-full md:w-1/2">
          <img
            src={feedback}
            alt="FeedBack"
            className="w-full"
          />
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
