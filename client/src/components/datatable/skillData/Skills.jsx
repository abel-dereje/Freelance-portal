import React, { useState, useEffect }  from 'react'
import axios from 'axios';
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import "./datatable.scss";

const Skills = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getSkills");
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
  if (error) return <div>Error: {error}</div>;

  // Define custom action renderer for the action column
  const actionColumn = (params) => (
    <div className="cellAction">
      <Link
        to={`/getSkill/${params.row._id}`}
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
    { field: "subTitle", headerName: "Subtitle", width: 200 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "totalStar", headerName: "Total Star", width: 150 },
    { field: "numberStar", headerName: "numberStar", width: 150 },
    { field: "address", headerName: "Address", width: 150 },
    // { field: 'location', headerName: 'Location', width: 150 },
    // { field: 'bio', headerName: 'Bio', width: 150 },
    // { field: 'isSeller', headerName: 'Is Seller', width: 150 },
    // { field: 'createdAt', headerName: 'Created At', width: 200 },
    // { field: 'updatedAt', headerName: 'Updated At', width: 200 },
    // { field: '__v', headerName: '__v', width: 100 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: actionColumn, // Use the custom action renderer
    },
  ];

  const handleDelete = async (id) => {
    try {
      // Send delete request to the backend to delete the user
      await axios.delete(`http://localhost:4000/skill/${id}`);
      // Update the data state to reflect the changes
      setData((prevData) => prevData.filter((row) => row._id !== id));
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      // Handle error appropriately
    }
  };

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
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={getRowId}
      />
    </div>
  );
};

export default Skills
