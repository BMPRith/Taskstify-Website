import React, { useContext, useState } from 'react';
import signup_photo from '../../assets/Sign Up.png';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import hide from '../../assets/eye.png';
import unhide from '../../assets/view.png';
import * as Yup from 'yup';

const SignUp = () => {
    const { signup } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
  };
    return (
        <div className="min-h-screen font-rubik flex items-center justify-center">
            <div className="flex w-full max-w-4xl rounded-lg">
                <div className="w-1/2">
                    <img src={signup_photo} className="object-cover h-full w-full" />
                </div>
                <div className="pl-12 border-r-2 border-gray-200"></div>
                <div className="w-1/2 p-8 flex flex-col justify-center">
                    <p className="text-2xl font-semibold text-gray-700 text-center">Create Your Account</p>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            password: '',
                        }}
                        validationSchema={Yup.object({
                            name: Yup.string().max(12, 'Name Is Too Long').required('Name Is Required'),
                            email: Yup.string().email('Please Provide Your Email').required('Email Is Required'),
                            password: Yup.string()
                                .min(10, 'Password must be at least 10 characters')
                                .matches(
                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
                                    'Password must contain at least one uppercase, one lowercase, one number, and one special character'
                                )
                                .required('Password Is Required'),
                        })}
                        onSubmit={async (values, { setSubmitting, setErrors }) => {
                            try {
                                await signup(values.name, values.email, values.password);
                            } catch (error) {
                                if (error.message === 'EMAIL_TAKEN') {
                                    setErrors({ email: "Email Already Taken" });
                                }
                            }
                            setSubmitting(false);
                        }}
                    >
                        <Form className="mt-8">
                            <div className="mb-8">
                                <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">
                                    Name
                                </label>
                                <Field
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="shadow border bg-white rounded w-full py-2 px-3 text-gray-700"
                                />
                                <ErrorMessage name="name" component="div" className="text-red-500 font-medium text-sm mt-1" />
                            </div>
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
                            <div className="mb-12">
                                <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
                                    Password
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
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-yellow-500 shadow hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded w-full"
                                >
                                    Signup
                                </button>
                            </div>
                            <p className="mt-5 text-center text-gray-700">
                                Already Have An Account?
                                <Link to="/login" className="text-yellow-500 font-medium hover:text-yellow-800 pl-1">
                                    Login
                                </Link>
                            </p>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
