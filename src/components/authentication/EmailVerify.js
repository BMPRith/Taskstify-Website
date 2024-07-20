import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import emailIcon from '../../assets/Email.png';

const EmailVerify = () => {
    const { verifyEmail, resendVerify } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;

    const validationSchema = Yup.object().shape({
        code: Yup.string()
            .required('Verification code is required')
    });

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            await verifyEmail(email, values.code);
            navigate('/email-verify/success');
        } catch (error) {
            if (error.message === 'CODE_EXPIRED') {
                setErrors({ code: 'Verification Code Has Expired' });
            } else if (error.message === 'INVALID_CODE') {
                setErrors({ code: 'Invalid Verification Code' });
            } else {
                setErrors({ code: 'Verification Failed' });
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleResendCode = async () => {
        try {
            await resendVerify(email);
        } catch (error) {
            console.error('Error resending verification code:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-2xl md:max-w-xl sm:max-w-lg shadow-xl rounded-lg">
                <div className="m-8 flex flex-col items-center">
                    <img src={emailIcon} alt="Email Icon" width={50} />
                    <p className="text-4xl text-yellow-500 md:text-3xl sm:text-2xl font-medium text-center mt-4">Check Your Email</p>
                    <p className="text-sm font-medium text-gray-800 text-center mt-4">We have already sent the verification code to <span className='text-yellow-500 font-medium text-sm'>{email}</span></p>
                    <div className="max-w-md w-full">
                        <div className="mt-8">
                            <Formik
                                initialValues={{ code: '' }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <label htmlFor="code" className="block text-gray-800 text-sm font-medium mb-2">
                                            Verification Code
                                        </label>
                                        <div className="mb-4">
                                            <Field
                                                type="text"
                                                id="code"
                                                name="code"
                                                className="shadow border bg-white rounded w-full py-2 px-3 text-gray-700"
                                            />
                                            <ErrorMessage name="code" component="div" className="text-red-500 text-sm font-medium mt-1" />
                                        </div>
                                        <div className="flex items-center mt-6 justify-center">
                                            <button
                                                type="submit"
                                                className="bg-yellow-500 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded w-full"
                                                disabled={isSubmitting}
                                            >
                                                Verify
                                            </button>
                                        </div>
                                            <p className="text-gray-800 text-sm font-medium mt-4 text-center">
                                                Didn't get the code? <button className='underline text-yellow-500 hover:text-yellow-800' onClick={handleResendCode}>Resend</button>
                                            </p>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailVerify;
