import "./datatable.scss";
import Sidebar from "../../../sidebar/Sidebar";
import Navbar from "../../../navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProfile = ({ title1 }) => {
  const { id } = useParams();
  const [file, setFile] = useState("");
  const [title, setTitle] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [workHistory, setWorkHistory] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [skill, setSkill] = useState('');
  const [testimonial, setTestimonial] = useState('');
  const [certification, setCertification] = useState('');
  const [employmentHistory, setEmploymentHistory] = useState('');
  const [otherExperience, setOtherExperience] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getProfile/${id}`);
        const userData = response.data;
        // Populate the form fields with user data
        setTitle(userData.title);
        setHourlyRate(userData.hourlyRate);
        setWorkHistory(userData.workHistory);
        setPortfolio(userData.portfolio);
        setSkill(userData.skill);
        setTestimonial(userData.testimonial);
        setCertification(userData.certification);
        setEmploymentHistory(userData.employmentHistory);
        setOtherExperience(userData.otherExperience);
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
      const response = await axios.put(`http://localhost:4000/updateProfile/${id}`, {
        title,
        hourlyRate,
        workHistory,
        portfolio,
        skill,
        testimonial,
        certification,
        employmentHistory,
        otherExperience,
      });

      console.log('User information updated:', response.data);
      navigate('/profiles');
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
                  placeholder="Enter first name"
                />
              </div>
              <div className='formInput'>
                <label htmlFor='hourlyRate'>Hourly Rate</label>
                <input
                  type='text'
                  id='hourlyRate'
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  placeholder="Enter Hourly Rate"
                />
              </div>
              <div className='formInput'>
                <label htmlFor='workHistory'>Work History</label>
                <input
                  type='text'
                  id='workHistory'
                  value={workHistory}
                  onChange={(e) => setWorkHistory(e.target.value)}
                  placeholder="Enter work history"
                />
              </div>
              <div className='formInput'>
                <label htmlFor='portfolio'>Portfolio</label>
                <input
                  type='text'
                  id='portfolio'
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  placeholder="Enter portfolio"
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
                />
              </div>
              <div className='formInput'>
                <label htmlFor='employmentHistory'>Employment History</label>
                <input
                  type='text'
                  id='employmentHistory'
                  value={employmentHistory}
                  onChange={(e) => setEmploymentHistory(e.target.value)}
                  placeholder="Enter employment history"
                />
              </div>
              <div className='formInput'>
                <label htmlFor='otherExperience'>Other Experience</label>
                <input
                  type='text'
                  id='otherExperience'
                  value={otherExperience}
                  onChange={(e) => setOtherExperience(e.target.value)}
                  placeholder="Enter other experience"
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

export default EditProfile;