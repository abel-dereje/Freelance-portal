import React, { useState, useEffect }  from 'react'
import axios from 'axios';
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import "./datatable.scss";



const Conversations = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getConversations");
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
        to={`/getConversation/${params.row._id}`}
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
    { field: "sellerId", headerName: "Seller ID", width: 150 },
    { field: "buyerId", headerName: "Buyer ID", width: 200 },
    { field: "readBySeller", headerName: "Read By Seller", width: 150 },
    { field: "readByBuyer", headerName: "Read By Buyer", width: 150 },
    { field: "lastMessage", headerName: "Last Message", width: 150 },
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
      await axios.delete(`http://localhost:4000/conversations/${id}`);
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
}

export default Conversations
