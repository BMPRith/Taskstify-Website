import React, { createContext, useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser({ name: decodedToken.name, email: decodedToken.sub });
      navigate('/home');
    }
  },[]);
    const login = async (email, password, rememberMe) => {
        try {
            const response = await axios.post('/home/login', { email, password, rememberMe });
            const { name: userName, token, email: userEmail } = response.data.payload;
            if (rememberMe) {
                localStorage.setItem('token', token);
            } else{
                localStorage.setItem('token', token);
            }
            setUser({ name: userName, email: userEmail });
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
            const response = await axios.post('/home/register', { name, email, password });
            const {name: userName, email: userEmail } = response.data.payload;
            setUser({name: userName,  email: userEmail });
        } catch (error) {
            if(error.response && error.response.status === 409){
                throw new Error('EMAIL_TAKEN');
            } else{
                throw new Error('Signup failed');
            }          
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
