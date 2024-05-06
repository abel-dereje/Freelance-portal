import "./viewSkill.scss";
import Sidebar from "../../../sidebar/Sidebar";
import Navbar from "../../../navbar/Navbar";

import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';


const ViewSkill = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('');
  const [totalStar, setTotalStar] = useState('');
  const [numberStar, setNumberStar] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [price, setPrice] = useState('');

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
                  <span className="itemKey">Title:</span>
                  <span className="itemValue">{title}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Subtitle:</span>
                  <span className="itemValue">{subTitle}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Category:</span>
                  <span className="itemValue">{category}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Total Star:</span>
                  <span className="itemValue">{totalStar}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Number Star:</span>
                  <span className="itemValue">{numberStar}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Location:</span>
                  <span className="itemValue">{location}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Biography:</span>
                  <span className="itemValue">{bio}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">{price}</span>
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

export default ViewSkill;