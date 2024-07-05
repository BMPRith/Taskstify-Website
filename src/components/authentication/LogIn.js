import React, { useContext, useState } from 'react';
import signin from '../../assets/Log In.png';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LogIn = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const handleRememberMe = () => {
    setRememberMe(!rememberMe)
  };
  return (
    <div className="min-h-screen font-rubik flex items-center justify-center">
      <div className="flex w-full max-w-4xl rounded-lg">
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <p className="text-2xl font-semibold text-gray-800 text-center">Welcome Back To Taskstify</p>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={Yup.object({
              email: Yup.string().email('Please Provide Your Email').required('Email Is Required'),
              password: Yup.string().required('Password Is Required'),
            })}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                await login(values.email, values.password, rememberMe);
                navigate('/home');
              } catch (error) {
                if (error.message === 'EMAIL_NOT_FOUND') {
                  setErrors({ email: "Email Doesn't Exist" });
                } else if (error.message === 'INCORRECT_PASSWORD') {
                  setErrors({ password: 'Incorrect Password' });
                }
              }
              setSubmitting(false);
            }}
          >
            <Form className="mt-8">
              <div className="mb-8">
                <label htmlFor="email" className="block text-gray-800 text-sm font-semibold mb-2">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="shadow border rounded w-full py-2 px-3 bg-white text-gray-800"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 font-medium text-sm mt-1" />
              </div>
              <div className="mb-12">
                <label htmlFor="password" className="block text-gray-800 text-sm font-semibold mb-2">
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-800"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 font-medium text-sm mt-1" />
              </div>
              <div className='mt-5 flex justify-between'>
              <div className="flex items-center">
                <input
                  checked={rememberMe}
                  onChange={handleRememberMe}
                  type="checkbox"
                  id="rememberMe"
                  className="hidden"
                />
                <label htmlFor="rememberMe" className="flex items-center cursor-pointer">
                  <span className={`w-5 h-5 rounded border-2 border-gray-800 mr-1 flex items-center justify-center transition-colors ${rememberMe ? 'bg-yellow-500' : 'bg-white'}`}>
                    {rememberMe && <svg className="w-5 h-5 font-semibold text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>}
                  </span>
                  <span className="text-gray-800 font-medium">Remember Me</span>
                </label>
              </div>
                <Link to='#'>
                  <span className='text-yellow-500 font-medium hover:text-yellow-800 pl-1'>Forgot Password?</span>
                </Link> 
              </div>
              <div className="flex items-center justify-between mt-5">
                <button
                  type="submit"
                  className="bg-yellow-500 shadow hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded w-full"
                >
                  Log In
                </button>
              </div>
              <p className='mt-5 text-center text-gray-800'>Don't Have An Account Yet? 
                <Link to='/signup'>
                  <span className='text-yellow-500 font-medium hover:text-yellow-800 pl-1'>Sign up</span>
                </Link>
              </p>
            </Form>
          </Formik>
        </div>
        <div className="border-r-2 border-gray-200"></div>
        <div className="w-1/2">
          <img src={signin} alt="Login" className="object-cover h-full w-full" />
        </div>
      </div>
    </div>
  );
}

export default LogIn;
