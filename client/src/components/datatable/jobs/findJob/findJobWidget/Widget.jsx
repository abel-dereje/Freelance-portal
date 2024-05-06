import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Pagination, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';

import "./widget.scss";

const Widget = ({ type }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const itemsPerPage = 9;
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getJobPosts");
        const modifiedData = response.data.map(job => ({
          ...job,
          id: job._id,
          // Truncate projectScope to 8 words
          projectScope: truncateText(job.projectScope, job._id), 
        }));
        setData(modifiedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to truncate the text to 30 words
  const truncateText = (text, jobId) => {
    const words = text.split(' ');
    if (words.length > 8) {
      const truncated = words.slice(0, 8).join(' ');
      return <>{truncated} <Link to={`viewJobById/${jobId}`} style={{fontSize: 'medium', fontStyle: 'italic', color: 'green'}}>Read more</Link></>;
    } else {
      return text;
    }
  };

  let paginatedData = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  let widgetContent = null;

  switch (type) {
    case "user":
      widgetContent = (
        <Grid container spacing={2}>
          {paginatedData.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <Card className='card-content'>
                <CardContent>
                  <Typography variant="h6" className="job-title">
                    <Link to={`viewJobById/${job.id}`} className="card-link" style={{ fontStyle: 'italic', fontSize: 'large', color: 'green' }}>
                      Job Title: {job.jobTitle}
                    </Link>
                  </Typography>
                  <Typography variant="body1">Skill: {job.projectSkill}</Typography>
                  <Typography variant="body1">Scope: {job.projectScope}</Typography>
                  <Typography variant="body1">Budget: {job.projectBudget}</Typography>
                  <Typography variant="body1">Category: {job.projectCategory}</Typography>
                  <i><VerifiedIcon className="verified-icon" sx={{ fontSize: 15 }} /> Payment Verified</i>
                  <Typography variant="body2" className="payment-info">
                    <i>$84K+ spent, </i>&nbsp;
                    <i>
                      <StarIcon sx={{ fontSize: 15, color: "goldenrod" }} />
                      <StarIcon sx={{ fontSize: 15, color: "goldenrod" }} />
                      <StarIcon sx={{ fontSize: 15, color: "goldenrod" }} />
                      <StarIcon sx={{ fontSize: 15, color: "goldenrod" }} />
                      <StarIcon sx={{ fontSize: 15, color: "goldenrod" }} />
                    </i>&nbsp;&nbsp;&nbsp;<i>Ethiopia</i>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      );
      break;
    default:
      break;
  }

  return (
    <div className="left">
      {loading ? <div>Loading...</div> : error ? <div>Error: {error}</div> : widgetContent}
      <Box display="flex" justifyContent="flex-end" marginTop={2}>
        <Box borderRadius={5} padding={1}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            color="primary"
            size="large"
            siblingCount={1}
            boundaryCount={1}
          />
        </Box>
      </Box>
    </div>
  );
};

export default Widget;
