import React, { useState } from 'react';
import key from '../../assets/Key.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import back from '../../assets/back-button.png';
import axios from '../../axiosConfig';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import hide from '../../assets/eye.png';
import unhide from '../../assets/view.png';
const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const token = new URLSearchParams(location.search).get('token');

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post('/home/reset-password', { token, password: values.password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                navigate('/reset-password/success');
            }
        } catch (error) {
            if (error.response.status === 401) {
                navigate('/expired');
            } else {
                throw new Error('Reset Password Failed');
            }
        } finally {
            setSubmitting(false);
        }
    };
    
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
  };
    const toggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword(!showConfirmPassword); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-2xl md:max-w-xl sm:max-w-lg shadow-xl rounded-lg">
            <div className="m-8 flex flex-col items-center">
                <img src={key} alt="Email Icon" width={50}/>
                <p className="text-4xl text-yellow-500 md:text-3xl sm:text-2xl font-medium text-center mt-4">Change Password</p>
                <p className="text-sm font-medium text-gray-700 text-center mt-4">Your New Password Must Be Different From Previously Used Password.</p>
                <Formik
                    initialValues={{
                        password: '',
                        confirmPassword: ''
                    }}
                    validationSchema={Yup.object({
                        password: Yup.string()
                            .min(10, 'Password must be at least 10 characters')
                            .matches(
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
                                'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
                            )
                            .required('New Password Is Required'),
                        confirmPassword: Yup.string()
                            .oneOf([Yup.ref('password'), null], 'Passwords must match')
                            .required('Confirm New Password Is Required')
                    })}
                    onSubmit={handleSubmit}
                >
                    <Form className="max-w-md w-full">
                        <div className="mt-8">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                                New Password
                            </label>
                            <div className="relative">
                                <Field
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    className="shadow border rounded w-full py-2 px-3 bg-white text-gray-700"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <img src={unhide} width={20}/>
                                    ) : (
                                        <img src={hide} width={20}/>
                                    )}
                                </button>
                            </div>
                            <ErrorMessage name="password" component="div" className="text-red-500 font-medium text-sm mt-1" />
                        </div>
                        <div className="mt-8">
                            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <Field
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="shadow border rounded w-full py-2 px-3 bg-white text-gray-700"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none"
                                    onClick={toggleConfirmPasswordVisibility}
                                >
                                    {showConfirmPassword ? (
                                        <img src={unhide} width={20}/>
                                    ) : (
                                        <img src={hide} width={20}/>
                                    )}
                                </button>
                            </div>
                            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 font-medium text-sm mt-1" />
                        </div>
                        <div className="flex items-center mt-6 justify-center">
                            <button
                                type="submit"
                                className="bg-yellow-500 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded w-full"
                            >
                                Change
                            </button>
                        </div>
                        <div className='text-gray-800 flex justify-center items-center'>
                            <Link to={'/login'} className='flex justify-between mt-5 hover:underline'>
                                <img src={back} width={20} alt="Back Icon"/>
                                <p className='text-gray-800 font-medium text-sm pl-1'>Back To Login</p>
                            </Link>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    </div>
);
};

export default ChangePassword;