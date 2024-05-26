import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import setAuthToken from '../../components/datatable/setAuth';
import './login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:4000/login', { 
        email,
        password
      });
      
      console.log('Response data:', response.data); // Log the response data
  
      const { accessToken, userRole, userId } = response.data;
  
      // Check if the user data is valid
      if (!accessToken || !userRole || !userId) {
        throw new Error('Invalid user data received from the server');
      }
  
      // Set the auth token in Axios
      setAuthToken(accessToken);
  
      // Store the token, role, and userId in localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('userId', userId);
  
      console.log('Login successful:', response.data);
      navigate('/skills');
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure
    }
  };
  

  return (
    <div className='auth-page'>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Login</button>
      </form>
      <div className='additional-links'>
        <Link to="/signup" className='signup-button'>Signup</Link>
        <Link to="/forgotPassword" className='forgot-password-button'>Forgot Password</Link>
      </div>
    </div>
  );
};

export default Login;
