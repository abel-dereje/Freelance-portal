import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import setAuthToken from '../../components/datatable/setAuth';
import './login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const [successMessage, setSuccessMessage] = useState(''); 
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset the messages
    setErrorMessage('');
    setSuccessMessage('');

    // Basic client-side validation
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Password cannot be empty.');
      return;
    }

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

      // Display success message
      setSuccessMessage('Login successful! Redirecting...');

      // Navigate after a short delay to give user time to see the success message
      setTimeout(() => navigate('/users'), 2000);
    } catch (error) {
      console.error('Login failed:', error);

      // Check for specific error responses from the server
      if (error.response && error.response.status === 401) {
        setErrorMessage('Incorrect email or password. Please try again.');
      } else if (error.response) {
        setErrorMessage('Your account is inactive. Please contact the system administrator');
      } else {
        setErrorMessage('Network error. Please try again later.');
      }
    }
  };

  return (
    <div className='auth-page'>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {errorMessage && <div className='error-message'>{errorMessage}</div>} 
        {successMessage && <div className='success-message'>{successMessage}</div>} 
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
