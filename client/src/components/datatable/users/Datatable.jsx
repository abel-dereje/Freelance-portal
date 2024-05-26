import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import setAuthToken from "../setAuth";
import "./datatable.scss";

import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Datatable = () => {
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

        if (role === "admin") {
          const response = await axios.get("http://localhost:4000/users", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setData(response.data);
        } else {
          const response = await axios.get(`http://localhost:4000/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setData([response.data]);
        }

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
      const token = localStorage.getItem("accessToken");
      await axios.delete(`http://localhost:4000/deleteUser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData((prevData) => prevData.filter((row) => row._id !== id));
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      setError("Error deleting user. Please try again later.");
    }
  };

  const toggleActive = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      const user = data.find((user) => user._id === id);
      const status = user.status === 'active' ? 'inactive' : 'active';

      const response = await axios.put(
        `http://localhost:4000/status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData((prevData) =>
        prevData.map((user) =>
          user._id === id ? { ...user, status: response.data.user.status } : user
        )
      );
    } catch (error) {
      console.error(`Error toggling user status with ID ${id}:`, error);
      setError("Error toggling user status. Please try again later.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const actionColumn = (params) => (
    <div className="cellAction">
      <Link to={`/users/editUser/${params.row._id}`} style={{ textDecoration: "none" }}>
        <button className="editButton">
          <EditIcon />
        </button>
      </Link>
      <button className={params.row.status === 'active' ? 'active' : 'passive'} onClick={() => toggleActive(params.row._id)}>
        {params.row.status === 'active' ? <ToggleOnIcon /> : <ToggleOffIcon />}
      </button>
      <button className="deleteButton" onClick={() => handleDelete(params.row._id)}>
        <DeleteIcon />
      </button>
    </div>
  );

  const columns = [
    { field: "index", headerName: "No", width: 80, renderCell: (params) => params.row.id + 1 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "role", headerName: "Role", width: 150 },
    { field: "action", headerName: "Action", width: 200, renderCell: actionColumn },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/addUser" className="link">
          <AddIcon />
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

export default Datatable;
