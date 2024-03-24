import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './signup.scss';

const Signup = () => {
  // State variables to store username and password
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Here you can add your login logic
    console.log('firstName', firstName);
    console.log('lastName', lastName);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Country:', country);
  };

  return (
    <div className='signup-page'>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className='form-group'>
          <label htmlFor='firstName'>First name</label>
          <input
            type='firstName'
            id='firstName'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='lastfirstName'>Last name</label>
          <input
            type='lastName'
            id='lastName'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
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
        <div className='form-group'>
          <label htmlFor='country'>Country</label>
          <input
            type='country'
            id='country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Register</button>
      </form>
      <div className='additional-link'>
        <Link to="/login" className='signup-button'> Already registered</Link>
        {/* <button className='forgot-password-button'>Forgot Password</button> */}
      </div>
    </div>
  );
};


export default Signup;
