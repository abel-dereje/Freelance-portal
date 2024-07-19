import "./createProfile.scss";
import Sidebar from "../../../sidebar/Sidebar";
import Navbar from "../../../navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProfile = ({ title1 }) => {
  const [file, setFile] = useState("");
  const [title, setTitle] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [workHistory, setWorkHistory] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [skill, setSkill] = useState('');
  const [testimonial, setTestimonial] = useState('');
  const [certification, setCertification] = useState('');
  const [employmentHistory, setEmployment] = useState('');
  const [otherExperience, setOtherExperience] = useState('');
 
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    try {
      const response = await axios.post('http://localhost:4000/createProfile', {
        title,
        hourlyRate,
        workHistory,
        portfolio,
        skill,
        testimonial,
        certification,
        employmentHistory,
        otherExperience
      });

      console.log('Successfully registered:', response.data);
      navigate('/profiles');
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
          <label htmlFor='hourlyRate'>Hourly rate</label>
          <input
            type='text'
            id='hourlyRate'
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            placeholder="Enter Hourly Rate"
            required
          />
        </div>
        <div className='formInput'>
          <label htmlFor='workHistory'>Work history</label>
          <input
            type='text'
            id='workHistory'
            value={workHistory}
            onChange={(e) => setWorkHistory(e.target.value)}
            placeholder="Enter work history"
            required
          />
        </div>
        <div className='formInput'>
          <label htmlFor='portfolio'>Portfolio</label>
          <input
            type='text'
            id='portfolio'
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
            placeholder="Enter Portfolio"
            required
          />
        </div>
        <div className='formInput'>
          <label htmlFor='skill'>Skill</label>
          <input
            type='text'
            id='skill'
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            placeholder="Enter skill"
            required
          />
        </div>
        <div className='formInput'>
          <label htmlFor='testimonial'>Testimonial</label>
          <input
            type='text'
            id='testimonial'
            value={testimonial}
            onChange={(e) => setTestimonial(e.target.value)}
            placeholder="Enter testimonial"
            required
          />
        </div>
        <div className='formInput'>
          <label htmlFor='certification'>Certification</label>
          <input
            type='text'
            id='certification'
            value={certification}
            onChange={(e) => setCertification(e.target.value)}
            placeholder="Enter certification"
            required
          />
        </div>
        <div className='formInput'>
          <label htmlFor='employmentHistory'>Employment history</label>
          <input
            type='text'
            id='employmentHistory'
            value={employmentHistory}
            onChange={(e) => setEmployment(e.target.value)}
            placeholder="Enter employment history"
            required
          />
        </div>
        <div className='formInput'>
          <label htmlFor='otherExperience'>otherExperience</label>
          <input
            type='text'
            id='otherExperience'
            value={otherExperience}
            onChange={(e) => setOtherExperience(e.target.value)}
            placeholder="Enter other experience"
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

export default CreateProfile;
