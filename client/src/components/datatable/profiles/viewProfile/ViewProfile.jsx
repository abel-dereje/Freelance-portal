import "./viewProfile.scss";
import Sidebar from "../../../sidebar/Sidebar";
import Navbar from "../../../navbar/Navbar";

import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';


const ViewProfile = () => {
  const { id } = useParams();
  // const [file, setFile] = useState("");
  const [title, setTitle] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [workHistory, setWorkHistory] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [skill, setSkill] = useState('');
  const [testimonial, setTestimonial] = useState('');
  const [certification, setCertification] = useState('');
  const [employmentHistory, setEmploymentHistory] = useState('');
  const [otherExperience, setOtherExperience] = useState('');

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
                <h3 className="itemTitle">{title}</h3>
                <div className="detailItem">
                  <span className="itemKey">Hourly Rate:</span>
                  <span className="itemValue">{hourlyRate}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Work History:</span>
                  <span className="itemValue">{workHistory}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Portfolio:</span>
                  <span className="itemValue">{portfolio}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Skill:</span>
                  <span className="itemValue">{skill}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Testimonial:</span>
                  <span className="itemValue">{testimonial}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Certification:</span>
                  <span className="itemValue">{certification}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Employment History:</span>
                  <span className="itemValue">{employmentHistory}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Other Experience:</span>
                  <span className="itemValue">{otherExperience}</span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div> */}
        </div>
        {/* <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <List/>
        </div> */}
      </div>
    </div>
  );
};

export default ViewProfile;