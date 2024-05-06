import "./viewJob.scss";
import Sidebar from "../../../sidebar/Sidebar";
import Navbar from "../../../navbar/Navbar";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';


const ViewJob = () => {
  const { id } = useParams();
  const [jobTitle, setJobTitle] = useState('');
  const [projectSkill, setProjectSkill] = useState('');
  const [projectScope, setProjectScope] = useState('');
  const [projectBudget, setProjectBudget] = useState('');
  const [projectCategory, setProjectCategory] = useState('');

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
  }, [id]);


  
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="editButton">Edit</div>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h3 className="itemTitle">{jobTitle}</h3>
                <div className="detailItem">
                  <span className="itemKey">Job title:</span>
                  <span className="itemValue">{jobTitle}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Project skill:</span>
                  <span className="itemValue">{projectSkill}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Project scope:</span>
                  <span className="itemValue">{projectScope}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Project budget:</span>
                  <span className="itemValue">{projectBudget}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Project category:</span>
                  <span className="itemValue">{projectCategory}</span>
                </div>
              </div>
            </div>
          </div>
          </div> 
        </div>
      </div>
    );
};

export default ViewJob;
