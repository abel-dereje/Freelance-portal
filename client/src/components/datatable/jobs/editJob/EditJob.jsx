import "./datatable.scss";
import Sidebar from "../../../sidebar/Sidebar";
import Navbar from "../../../navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

const EditJob = ({ title }) => {
  const { id } = useParams();
  const [file, setFile] = useState("");
  const [jobTitle, setJobTitle] = useState('');
  const [projectSkill, setProjectSkill] = useState('');
  const [projectScope, setProjectScope] = useState('');
  const [projectBudget, setProjectBudget] = useState('');
  const [projectCategory, setProjectCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/viewJob/${id}`);
        const userData = response.data;
        // Populate the form fields with user data
        setJobTitle(userData.jobTitle);
        setProjectSkill(userData.projectSkill);
        setProjectScope(userData.projectScope);
        setProjectBudget(userData.projectBudget);
        setProjectCategory(userData.projectCategory);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData(); // Call the fetchUserData function when the component mounts
  }, [id]); // Add id as a dependency so that the effect runs whenever the id changes

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`http://localhost:4000/updateJobPost/${id}`, {
        jobTitle,
        projectSkill,
        projectScope,
        projectBudget,
        projectCategory,
      });

      console.log('User information updated:', response.data);
      navigate('/jobs');
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

              <div className="formInput">
                <label htmlFor="jobTitle">Job Title</label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>
               <div className="formInput">
                <label htmlFor="projectSkill">Project Skill</label>
                <input
                  type="text"
                  id="projectSkill"
                  name="projectSkill"
                  value={projectSkill}
                  onChange={(e) => setProjectSkill(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label htmlFor="projectScope">Project Scope</label>
                <input
                  type="text"
                  id="projectScope"
                  name="projectScope"
                  value={projectScope}
                  onChange={(e) => setProjectScope(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label htmlFor="projectBudget">Project Budget</label>
                <input
                  type="text"
                  id="projectBudget"
                  name="projectBudget"
                  value={projectBudget}
                  onChange={(e) => setProjectBudget(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label htmlFor="projectCategory">Project Category</label>
                <input
                  type="text"
                  id="projectCategory"
                  name="projectCategory"
                  value={projectCategory}
                  onChange={(e) => setProjectCategory(e.target.value)}
                />
              </div>

              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditJob;
