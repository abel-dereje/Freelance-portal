import "./datatable.scss";
import Sidebar from "../../../sidebar/Sidebar";
import Navbar from "../../../navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = ({ title }) => {
  const { id } = useParams();
  const [file, setFile] = useState("");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/user/${id}`);
        const userData = response.data;
        // Populate the form fields with user data
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setEmail(userData.email);
        setRole(userData.role);
        // You can set other fields here if needed
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData(); // Call the fetchUserData function when the component mounts
  }, [id]); // Add id as a dependency so that the effect runs whenever the id changes

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`http://localhost:4000/updateUser/${id}`, {
        firstName,
        lastName,
        email,
        role,
        file,
      });

      console.log('User information updated:', response.data);
      navigate('/users');
    } catch (error) {
      console.error('Update failed:', error);
      // Handle update failure
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
                  /> Employer
                </label>
              </div>
              <button type='submit'>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
