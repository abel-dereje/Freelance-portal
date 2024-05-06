import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import setAuthToken from '../../setAuth';
import "./datatable.scss";

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const MainJob = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Add authorization token to the request headers
        setAuthToken(localStorage.getItem("accessToken"));
        const response = await axios.get("http://localhost:4000/getJobPosts");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching job posts:", error);
        setError("Unauthorized access. Please log in.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getRowId = (row) => row._id;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Define custom action renderer for the action column
  const actionColumn = (params) => (
    <div className="cellAction">
      <Link
        // to={`/jobs/viewJob/${params.row._id}`}
        to={`/jobs/viewJob/${params.row._id}`}
        style={{ textDecoration: "none" }}
      >
        <div className="viewButton"><RemoveRedEyeIcon/></div>
      </Link>
      <Link
        // to={`/postJob/postJob/${params.row._id}`}
        to={`/Jobs/editJob/${params.row._id}`}
        style={{ textDecoration: "none" }}
      >
        <div className="editButton"><EditIcon/></div>
      </Link>
      <div
        className="deleteButton"
        onClick={() => handleDelete(params.row._id)}
      >
        <DeleteIcon/>
      </div>
    </div>
  );

  const columns = [
    { field: "index", headerName: "No", width: 80, renderCell: (params) => params.row.id + 1 },
    { field: "jobTitle", headerName: " Job Title", width: 150 },
    { field: "projectSkill", headerName: "Project Skill", width: 200 },
    { field: "projectScope", headerName: "Project Scope", width: 150 },
    { field: "projectBudget", headerName: "Project Budget", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: actionColumn, // Use the custom action renderer
    },
  ];

  const handleDelete = async (id) => {
    try {
      // Send delete request to the backend to delete the job post
      const token = localStorage.getItem("accessToken");
      await axios.delete(`http://localhost:4000/deleteJobPost/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Update the data state to reflect the changes
      setData((prevData) => prevData.filter((row) => row._id !== id));
    } catch (error) {
      console.error(`Error deleting job post with ID ${id}:`, error);
      // Handle error appropriately
    }
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Job
        <Link to="/Jobs/postJob" className="link">
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

export default MainJob;
