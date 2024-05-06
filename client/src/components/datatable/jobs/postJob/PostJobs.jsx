import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./postJob.scss";
import Sidebar from "../../../sidebar/Sidebar";
import Navbar from "../../../navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const PostJob = ({ title1 }) => {
  const [file, setFile] = useState("");
  const [jobTitle, setJobTitle] = useState('');
  const [projectSkill, setProjectSkill] = useState('');
  const [projectScope, setProjectScope] = useState('');
  const [projectBudget, setProjectBudget] = useState('');
  const [projectCategory, setProjectCategory] = useState([]); // State for project categories
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/jobs', {
        jobTitle,
        projectSkill,
        projectScope,
        projectBudget,
        projectCategory // Include projectCategory in the request
      });

      console.log('Successfully registered:', response.data);
      navigate('/jobs');
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
                <label htmlFor='title'>Job Title</label>
                <input
                  type='text'
                  id='jobTitle'
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Enter title"
                  required
                />
              </div>
              <div className='formInput'>
                <label htmlFor='projectSkill'>Project Skill</label>
                <input
                  type='text'
                  id='projectSkill'
                  value={projectSkill}
                  onChange={(e) => setProjectSkill(e.target.value)}
                  placeholder="Enter subtitle"
                  required
                />
              </div>
              <div className='formInput'>
                <label htmlFor='projectScope'>Project Scope</label>
                <input
                  type='text'
                  id='projectScope'
                  value={projectScope}
                  onChange={(e) => setProjectScope(e.target.value)}
                  placeholder="Enter category"
                  required
                />
              </div>
              <div className='formInput'>
                <label htmlFor='projectBudget'>Project budget</label>
                <input
                  type='text'
                  id='projectBudget'
                  value={projectBudget}
                  onChange={(e) => setProjectBudget(e.target.value)}
                  placeholder="Enter total star"
                  required
                />
              </div>
              <div className="formInput">
              <div className="dropdown-container">
                <label htmlFor="projectCategory">Project Category</label>
                <select
                  id="projectCategory"
                  value={projectCategory}
                  onChange={(e) =>
                    setProjectCategory(
                      Array.from(e.target.selectedOptions, (option) => option.value)
                    )
                  }
                  multiple
                  required
                  className="multi-select"
                >
    id='projectCategory'
    value={projectCategory}
    onChange={(e) => setProjectCategory(Array.from(e.target.selectedOptions, (option) => option.value))}
    multiple
    required
    {/* style={{ border: 'none', outline: 'none', appearance: 'none', background: 'transparent', marginRight: '5px' }} */}
  
    <optgroup label="IT">
      <option value='Software engineering'>Software engineering</option>
      <option value='Computer Engineering'>Computer Engineering</option>
      <option value='ICT'>ICT</option>
      <option value='Information Systems'>Information Systems</option>
      <option value='Information Science'>Information Science</option>
    </optgroup>
    <optgroup label="Medicine">
      <option value='Medicine'>Medicine</option>
      <option value='Nurse'>Nurse</option>
    </optgroup>
  </select>
              </div>
              </div>


              <button type='submit'>Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
