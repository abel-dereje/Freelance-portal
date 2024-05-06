import React from 'react';
import Sidebar from '../../../../sidebar/Sidebar';
import Navbar from '../../../../navbar/Navbar';
import Widget from './Widget';
import "./viewJob.scss";

const ViewJob = () => {
  return (
    <div className='home'>
      <Sidebar />
      <div className='homeContainer'>
        <Navbar />
        <div className="widget">
          <Widget type="user" />
          {/* Add more widgets here if needed */}
          {/* <Link to="/view-more"></Link> Link to the "View More" page */}
        </div>
      </div>
    </div>
  );
}

export default ViewJob;
