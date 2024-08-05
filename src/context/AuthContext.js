import React, { createContext, useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const isTokenExpired = (token) => {
        if (!token) {
            return true;
        }
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
            if (isTokenExpired(token)) {
                logout();
            } else{
                const decodedToken = jwtDecode(token);
                setUser({ name: decodedToken.name, email: decodedToken.sub });
                navigate('/home');
            }
    }, []);

    const login = async (email, password, rememberMe) => {
        try {
            const response = await axios.post('/home/login', { email, password, rememberMe });
            const { name: userName, token, email: userEmail } = response.data.payload;
            localStorage.setItem('token', token);
            setUser({ name: userName, email: userEmail });
            navigate('/home');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                throw new Error('EMAIL_NOT_FOUND');
            } else if (error.response && error.response.status === 401) {
                throw new Error('INCORRECT_PASSWORD');
            } else {
                throw new Error('Login Failed');
            }
        }
    };

    const signup = async (name, email, password) => {
        try {
            await axios.post('/home/register', { name, email, password });
            navigate('/email-verify', { state: { email } });
        } catch (error) {
            if (error.response && error.response.status === 409) {
                throw new Error('EMAIL_TAKEN');
            } else {
                throw new Error('Signup failed');
            }
        }
    };

    const verifyEmail = async (email, code) => {
        try {
            const response = await axios.post('/home/verify-email', { email, code });
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 410) {
                throw new Error('CODE_EXPIRED');
            } else if (error.response && error.response.status === 400) {
                throw new Error('INVALID_CODE');
            } else {
                throw new Error('VERIFICATION_FAILED');
            }
        }
    };

    const resendVerify = async (email) => {
        try {
            const response = await axios.post('/home/resend-verification-code', { email });
            console.log(response.data);
        } catch (error) {
            console.error('Failed to resend verification code:', error.response ? error.response.data : error.message);
        }
    };

    const forgotPassword = async (email) => {
        try {
            const response = await axios.post('/home/forgot-password', { email }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                navigate('/email-sending');
            }
        } catch (error) {
            throw new Error('Email not found');
        }
    };
    
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };


    return (
        <AuthContext.Provider value={{ user, login, signup, verifyEmail, resendVerify, forgotPassword, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
