import "./datatable.scss";
import Sidebar from "../../../sidebar/Sidebar";
import Navbar from "../../../navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditSkill = ({ title1 }) => {
  const { id } = useParams();
  const [file, setFile] = useState("");
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('');
  const [totalStar, setTotalStar] = useState('');
  const [numberStar, setNumberStar] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/skill/${id}`);
        const userData = response.data;
        // Populate the form fields with user data
        setTitle(userData.title);
        setSubTitle(userData.subTitle);
        setCategory(userData.category);
        setTotalStar(userData.totalStar);
        setNumberStar(userData.numberStar);
        setAddress(userData.address);
        setLocation(userData.location);
        setBio(userData.bio);
        setPrice(userData.price);
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
      const response = await axios.put(`http://localhost:4000/skill/${id}`, {
        title,
        subTitle,
        category,
        totalStar,
        numberStar,
        address,
        location,
        bio,
        price,
      });

      console.log('User information updated:', response.data);
      navigate('/skills');
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
          <h1>{title1}</h1>
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
                <label htmlFor='title'>Title</label>
                <input
                  type='text'
                  id='title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  // placeholder="Enter first name"
                />
              </div>
              <div className='formInput'>
                <label htmlFor='subTitle'>Subtitle Rate</label>
                <input
                  type='text'
                  id='subTitle'
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                  // placeholder="Enter Hourly Rate"
                />
              </div>
              <div className='formInput'>
                <label htmlFor='category'>Category</label>
                <input
                  type='text'
                  id='category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  // placeholder="Enter work history"
                />
              </div>
              <div className='formInput'>
                <label htmlFor='totalStar'>Total Star</label>
                <input
                  type='text'
                  id='totalStar'
                  value={totalStar}
                  onChange={(e) => setTotalStar(e.target.value)}
                  // placeholder="Enter portfolio"
                />
              </div>
              <div className='formInput'>
                <label htmlFor='numberStar'>Number Star</label>
                <input
                  type='text'
                  id='numberStar'
                  value={numberStar}
                  onChange={(e) => setNumberStar(e.target.value)}
                  // placeholder="Enter skill"
                />
              </div>
              <div className='formInput'>
                <label htmlFor='address'>address</label>
                <input
                  type='text'
                  id='address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  // placeholder="Enter testimonial"
                />
              </div>
              <div className='formInput'>
                <label htmlFor='location'>Location</label>
                <input
                  type='text'
                  id='location'
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  // placeholder="Enter certification"
                />
              </div>
              <div className='formInput'>
                <label htmlFor='bio'>Biography</label>
                <input
                  type='text'
                  id='bio'
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  // placeholder="Enter employment history"
                />
              </div>
              <div className='formInput'>
                <label htmlFor='price'>Price</label>
                <input
                  type='text'
                  id='price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  // placeholder="Enter other experience"
                />
              </div>
              
              <button type='submit'>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSkill;