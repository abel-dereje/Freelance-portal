import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import setAuthToken from '../setAuth';
import "./datatable.scss";

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Skills = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const role = localStorage.getItem("userRole");
        const userId = localStorage.getItem("userId");

        if (!token) {
          throw new Error("No access token found");
        }

        setAuthToken(token);

        let response;
        if (role === "admin") {
          response = await axios.get("http://localhost:4000/getSkills", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        } else {
          response = await axios.get(`http://localhost:4000/skill/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        }
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>; // Display error message

  const actionColumn = (params) => (
    <div className="cellAction">
      <Link
        to={`/skills/viewSkill/${params.row._id}`} 
        style={{ textDecoration: "none" }}
      >
        <div className="viewButton"><RemoveRedEyeIcon/></div>
      </Link>
      <Link
        to={`/skills/editSkill/${params.row._id}`}
        style={{ textDecoration: "none" }}
      >
        <div className="editButton"><EditIcon/></div>
      </Link>
      <div
        className="deleteButton"
        onClick={() => handleDelete(params.row._id)}
      >
       < DeleteIcon />
      </div>
    </div>
  );

  const columns = [
    { field: "index", headerName: "No", width: 80, renderCell: (params) => params.row.id + 1 },
    { field: "title", headerName: "Title", width: 150 },
    { field: "subTitle", headerName: "Subtitle", width: 200 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "totalStar", headerName: "Total Star", width: 150 },
    { field: "numberStar", headerName: "Number Star", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: actionColumn,
    },
  ];

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      setAuthToken(token);

      await axios.delete(`http://localhost:4000/skill/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData((prevData) => prevData.filter((row) => row._id !== id));
    } catch (error) {
      console.error(`Error deleting skill with ID ${id}:`, error);
      setError("Error deleting skill. Please try again later."); // Update error state
    }
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Skill
        <Link to="/skills/addSkill" className="link">
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

export default Skills;
