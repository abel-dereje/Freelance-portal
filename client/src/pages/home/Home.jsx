import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Card from "./Card"; // Ensure Card component path is correct
import "./home.scss";

// Importing Material-UI icons
import SkillsIcon from "@mui/icons-material/Assessment";
import UsersIcon from "@mui/icons-material/People";
import JobsIcon from "@mui/icons-material/Work";
import ProfilesIcon from "@mui/icons-material/AccountCircle";
import Widget from '../../components/widget/Widget'; // Ensure Widget component path is correct

const Home = () => {
  // Static content for each card
  const skillsContent = (
    <ul>
      {/* <li>React - 80%</li>
      <li>Node.js - 70%</li>
      <li>Python - 90%</li> */}
    </ul>
  );

  const usersContent = (
    <ul>
      {/* <li>Alice Johnson - alice@example.com</li>
      <li>Bob Brown - bob@example.com</li> */}
    </ul>
  );

  const jobsContent = (
    <ul>
      {/* <li>Frontend Developer at Tech Corp</li>
      <li>UI/UX Designer at Design Studio</li> */}
    </ul>
  );

  const profilesContent = (
    <ul>
      {/* <li>John Doe - Developer</li>
      <li>Jane Smith - Designer</li> */}
    </ul>
  );

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="cardGrid">
          <Card title="Skills" content={skillsContent} icon={<SkillsIcon />} />
          <Card title="Users" content={usersContent} icon={<UsersIcon />} />
          <Card title="Jobs" content={jobsContent} icon={<JobsIcon />} />
          <Card title="Profiles" content={profilesContent} icon={<ProfilesIcon />} />
        </div>
      </div>
    </div>
  );
};

export default Home;
