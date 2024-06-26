import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
// import StoreIcon from "@mui/icons-material/Store";
import PostAddIcon from '@mui/icons-material/PostAdd';
import GroupIcon from '@mui/icons-material/Group';
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AppsIcon from '@mui/icons-material/Apps';
import SchoolIcon from '@mui/icons-material/School';
import ChatIcon from '@mui/icons-material/Chat';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";






import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <span className="logo">Freelance Portal</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <GroupIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/profiles" style={{ textDecoration: "none" }}>
            <li>
              <PhotoLibraryIcon className="icon" />
              <span>Profiles</span>
            </li>
          </Link>
          <Link to="/skills" style={{ textDecoration: "none" }}>
            <li>
              <SchoolIcon className="icon" />
              <span>Skills</span>
            </li>
          </Link>
          <Link to="/conversations" style={{ textDecoration: "none" }}>
            <li>
              <ChatIcon className="icon" />
              <span>Conversations</span>
            </li>
          </Link>
          <Link to="/Jobs" style={{ textDecoration: "none" }}>
            <li>
              <PostAddIcon className="icon" />
              <span>Post Job</span>
            </li>
          </Link>
          <Link to="/findJobs" style={{ textDecoration: "none" }}>
            <li>
              <SearchOutlinedIcon className="icon" />
              <span>Find Job</span>
            </li>
          </Link>
          <Link to="/your-network" style={{ textDecoration: "none" }}>
          <li>
            <PeopleAltIcon className="icon" />
            <span>Your Network</span>
          </li>
          </Link>
          <Link to="/reports" style={{ textDecoration: "none" }}>
          <li>
            <MonetizationOnIcon className="icon" />
            <span>Reports</span>
          </li>
          </Link>
          {/* <Link to="/my-requests" style={{ textDecoration: "none" }}>
          <li>
            <LocalShippingIcon className="icon" />
            <span>My Requests</span>
          </li>
          </Link> */}
          <Link to="/apps-and-offers" style={{ textDecoration: "none" }}>
          <li>
            <AppsIcon className="icon" />
            <span>Apps and Offers</span>
          </li>
          </Link>
          {/* <Link to="/reports" style={{ textDecoration: "none" }}>
          <li>
            <LocalShippingIcon className="icon" />
            <span>Reports</span>
          </li>
          </Link> */}
          <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <Link to="/" style={{ textDecoration: "none" }}>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch ({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch ({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;