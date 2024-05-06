import "./addSkill.scss";
import Sidebar from "../../../sidebar/Sidebar";
import Navbar from "../../../navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddSkill = ({ title1 }) => {
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

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    try {
      const response = await axios.post('http://localhost:4000/skills', {
        title,
        subTitle,
        category,
        totalStar,
        numberStar,
        address,
        location,
        bio,
        price
      });

      console.log('Successfully registered:', response.data);
      navigate('/skills');
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
        <h1>{title1}
        Add SKill</h1>
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
            placeholder="Enter title"
            required
          />
        </div>
        <div className='formInput'>
          <label htmlFor='subTitle'>Sub Title</label>
          <input
            type='text'
            id='subTitle'
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            placeholder="Enter subtitle"
            required
          />
        </div>
        <div className='formInput'>
          <label htmlFor='category'>Category</label>
          <input
            type='text'
            id='category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category"
            required
          />
        </div>
        <div className='formInput'>
          <label htmlFor='totalStar'>Total Star</label>
          <input
            type='text'
            id='totalStar'
            value={totalStar}
            onChange={(e) => setTotalStar(e.target.value)}
            placeholder="Enter total star"
            required
          />
        </div>
        <div className='formInput'>
          <label htmlFor='numberStar'>Number Star</label>
          <input
            type='text'
            id='numberStar'
            value={numberStar}
            onChange={(e) => setNumberStar(e.target.value)}
            placeholder="Enter number star"
            required
          />
        </div>
        <div className='formInput'>
          <label htmlFor='address'>Address</label>
          <input
            type='text'
            id='address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
            required
          />
        </div>
        <div className='formInput'>
          <label htmlFor='location'>Location</label>
          <input
            type='text'
            id='location'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            required
          />
        </div>
        <div className='formInput'>
          <label htmlFor='bio'>Total Star</label>
          <input
            type='text'
            id='bio'
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Enter bio"
            required
          />
        </div>
        <div className='formInput'>
          <label htmlFor='price'>Price</label>
          <input
            type='text'
            id='price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            required
          />
        </div>
        
        <button type='submit'>Register</button>
      </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSkill;
