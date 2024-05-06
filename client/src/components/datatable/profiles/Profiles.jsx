import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import setAuthToken from '../setAuth'; // Import setAuthToken function
import "./datatable.scss";

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Profiles = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set JWT token in local storage
        setAuthToken(localStorage.getItem("accessToken"));

        // Fetch profile data with authenticated request
        const response = await axios.get(`http://localhost:4000/profiles`);
        const userData = response.data;
        setData(userData);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError(error); // Set error state if there's an error
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchData(); // Call fetchData function when component mounts
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  // Function to get row id
  const getRowId = (row) => row._id;

  // If loading, display loading message
  if (loading) return <div>Loading...</div>;
  // If error, display error message
  if (error) return <div>Error: {error.message}</div>;

  // Render action column
  const actionColumn = (params) => (
    <div className="cellAction">
      <Link
        to={`/profiles/viewProfile/${params.row._id}`}
        style={{ textDecoration: "none" }}
      >
        <div className="viewButton"><RemoveRedEyeIcon/></div>
      </Link>
      <Link
        to={`/profiles/editProfile/${params.row._id}`}
        style={{ textDecoration: "none" }}
      >
        <div className="editButton"><EditIcon/></div>
      </Link>
      <div
        className="deleteButton"
        onClick={() => handleDelete(params.row._id)}
      >
       <DeleteIcon />
      </div>
    </div>
  );

  // Define columns for data grid
  const columns = [
    { field: "index", headerName: "No", width: 80, renderCell: (params) => params.row.id + 1 },
    { field: "title", headerName: "Title", width: 150 },
    { field: "hourlyRate", headerName: "Hourly Rate", width: 200 },
    { field: "workHistory", headerName: "Work History", width: 150 },
    { field: "skill", headerName: "Skill", width: 150 },
    { field: "testimonial", headerName: "Testimonial", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: actionColumn,
    },
  ];

  // Function to handle profile deletion
  const handleDelete = async (id) => {
    try {
      // Set JWT token in local storage
      setAuthToken(localStorage.getItem("accessToken"));

      // Send delete request to server
      await axios.delete(`http://localhost:4000/deleteProfile/${id}`);
      // Update data state to remove deleted profile
      setData((prevData) => prevData.filter((row) => row._id !== id));
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
    }
  };

  // Render Profiles component
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Profile
        <Link to="/profiles/createProfile" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data.map((row, index) => ({ ...row, id: index }))}
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={getRowId}
      />
    </div>
  );
};

export default Profiles;
