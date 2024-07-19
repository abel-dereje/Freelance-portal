import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from "../../../sidebar/Sidebar";
import Navbar from "../../../navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import "./datatable.scss";

const EditUser = ({ title }) => {
  const { id } = useParams();
  const [file, setFile] = useState("");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/user/${id}`);
        const userData = response.data;
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setEmail(userData.email);
        setRole(userData.role);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Check if other fields are empty
    if (!firstName || !lastName) {
      setError('Please fill in all required fields.');
      return;
    }

    // If all validations pass, proceed with update
    setConfirmationVisible(true);
  };

  const handleConfirmation = async (confirmed) => {
    if (confirmed) {
      try {
        const response = await axios.put(`http://localhost:4000/updateUser/${id}`, {
          firstName,
          lastName,
          email,
          role,
          file,
        });
        console.log('User information updated:', response.data);
        setSuccessMessage('User information updated successfully!');
      } catch (error) {
        console.error('Update failed:', error);
      }
    }
    navigate('/users');
    setConfirmationVisible(false);
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
              <div className='form-group'>
                <label>Select Role</label>
                <label htmlFor='freelancer' className="radio-label">
                  <input
                    type='radio'
                    id='freelancer'
                    name='role'
                    value='freelancer'
                    checked={role === 'freelancer'}
                    onChange={(e) => setRole(e.target.value)}
                    // required
                  /> Freelancer
                </label>
                <label htmlFor='employer' className="radio-label">
                  <input
                    type='radio'
                    id='employer'
                    name='role'
                    value='employer'
                    checked={role === 'employer'}
                    onChange={(e) => setRole(e.target.value)}
                    // required
                  /> Employer
                </label>
              </div>
              <button type='submit'>Update</button>
            </form>
            {confirmationVisible && (
              <div className='popup'>
                <div className='popup-content'>
                  <p>Are you sure you want to update this user?</p>
                  <button onClick={() => handleConfirmation(true)}>Yes</button>
                  <button onClick={() => handleConfirmation(false)}>No</button>
                </div>
              </div>
            )}
            {error && (
              <div className='popup'>
                <div className='popup-content error'>
                  <p>{error}</p>
                </div>
              </div>
            )}
            {successMessage && (
              <div className='popup'>
                <div className='popup-content success'>
                  <p>{successMessage}</p>
                  <button onClick={() => setSuccessMessage('')}>Close</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
