import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import "./datatable.scss";

const Datatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to fetch user data from your backend API
        const response = await axios.get('http://localhost:4000/users');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={[
          { field: 'id', headerName: 'ID', width: 70 },
          { field: 'firstname', headerName: 'First Name', width: 150 },
          { field: 'lastname', headerName: 'Last Name', width: 150 },
          { field: 'email', headerName: 'Email', width: 200 },
          { field: 'password', headerName: 'Password', width: 150 },
          { field: 'country', headerName: 'Country', width: 150 },
        ]}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
