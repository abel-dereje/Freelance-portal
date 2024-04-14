import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import "./datatable.scss";

const Profiles = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch profiles with the authorization token
        const response = await axios.get("http://localhost:4000/getProfiles", {
          withCredentials: true, // Include credentials with the request
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getRowId = (row) => row._id;

  const handleDelete = async (id) => {
    try {
      // Delete profile with the authorization token
      await axios.delete(`http://localhost:4000/deleteProfile/${id}`, {
        withCredentials: true, // Include credentials with the request
      });
      // Update state to remove the deleted profile
      setData((prevData) => prevData.filter((row) => row._id !== id));
    } catch (error) {
      console.error(`Error deleting profile with ID ${id}:`, error);
      setError("Error deleting profile. Please try again later.");
    }
  };

  // Define custom action renderer for the action column
  const actionColumn = (params) => (
    <div className="cellAction">
      <Link
        to={`/getProfile/${params.row._id}`}
        style={{ textDecoration: "none" }}
      >
        <div className="viewButton">View</div>
      </Link>
      <div
        className="deleteButton"
        onClick={() => handleDelete(params.row._id)}
      >
        Delete
      </div>
    </div>
  );

  const columns = [
    { field: "title", headerName: "Title", width: 150 },
    { field: "hourlyRate", headerName: "Hourly Rate", width: 200 },
    { field: "workHistory", headerName: "Work History", width: 150 },
    { field: "portfolio", headerName: "Portfolio", width: 150 },
    { field: "skill", headerName: "Skill", width: 150 },
    // { field: "address", headerName: "Address", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: actionColumn,
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Profile
        <Link to="/profiles/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
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
