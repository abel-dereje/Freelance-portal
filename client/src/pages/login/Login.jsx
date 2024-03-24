import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.scss'; // Import the common SCSS file for styling

const Login = () => {
  // State variables to store username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Here you can add your login logic
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className='auth-page'>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className='form-group'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <Link to="../signup" className='signup-button'>Signup</Link>
        <Link to="../forgotPassword" className='forgot-password-button'>Forgot Password</Link>
      </div>
    </div>
  );
};

export default Login;
