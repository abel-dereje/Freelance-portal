import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './signup.scss';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the country API
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        // Extract country names from the data
        const countryNames = data.map(country => country.name.common);
        // Set the list of countries
        setCountries(countryNames);
      })
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    try {
      const response = await axios.post('http://localhost:4000/signup', {
        firstName,
        lastName,
        email,
        password,
        country
      });

      console.log('Successfully registered:', response.data);
      navigate('/users');
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration failure
    }
  };

  return (
    <div className='signup-page'>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className='form-group'>
          <label htmlFor='firstName'>First name</label>
          <input
            type='text'
            id='firstName'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='lastName'>Last name</label>
          <input
            type='text'
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
          <select
            id='country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          >
            <option value='' disabled>Select your country</option>
            {countries.map((countryName, index) => (
              <option key={index} value={countryName}>{countryName}</option>
            ))}
          </select>
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
