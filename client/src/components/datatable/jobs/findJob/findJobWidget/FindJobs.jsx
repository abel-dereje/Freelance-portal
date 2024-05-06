import React from 'react';
import Sidebar from '../../../../sidebar/Sidebar';
import Navbar from '../../../../navbar/Navbar';
import Widget from './Widget';
import "./findJobs.scss";

const FindJobs = () => {
  return (
    <div className='home'>
      <Sidebar />
      <div className='homeContainer'>
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          {/* Add more widgets here if needed */}
          {/* <Link to="/view-more"></Link> Link to the "View More" page */}
        </div>
      </div>
    </div>
  );
}

export default FindJobs;
