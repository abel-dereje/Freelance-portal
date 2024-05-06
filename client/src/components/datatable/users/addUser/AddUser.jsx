import "./addUser.scss";
import Sidebar from "../../../sidebar/Sidebar";
import Navbar from "../../../navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddUser = ({ title }) => {
  const [file, setFile] = useState("");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [role, setRole] = useState('');
  // const [image, setImage] = useState('');
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
        country,
        role,
        file,
      });

      console.log('Successfully registered:', response.data);
      navigate('/users');
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration failure
    }
  };


  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
          <form onSubmit={handleSubmit}>
          <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
        <div className='formInput'>
          <label htmlFor='firstName'>First name</label>
          <input
            type='text'
            id='firstName'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
            required
          />
        </div>
        <div className='formInput'>
          <label htmlFor='lastName'>Last name</label>
          <input
            type='text'
            id='lastName'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
            required
          />
        </div>
        <div className='formInput'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </div>
        <div className='formInput'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>
        <div className='formInput'>
          <label htmlFor='country'>Country</label>
          <select
            id='country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter country"
            required
          >
            <option value='' disabled>Select your country</option>
            {countries.map((countryName, index) => (
              <option key={index} value={countryName}>{countryName}</option>
            ))}
          </select>
        </div>
        <div className='form-group' >
        <label>Select Role</label>
          <label htmlFor='freelancer' className="radio-label">
            <input
              type='radio'
              id='freelancer'
              name='freelancer'
              value='freelancer'
              checked={role === 'freelancer'}
              onChange={(e) => setRole(e.target.value)}
            /> Freelancer
          </label>
          <label htmlFor='employer' className="radio-label">
            <input
              type='radio'
              id='employer'
              name='employer'
              value='employer'
              checked={role === 'employer'}
              onChange={(e) => setRole(e.target.value)}
            /> Employer
          </label>
        </div>

        <button type='submit'>Register</button>
      </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
