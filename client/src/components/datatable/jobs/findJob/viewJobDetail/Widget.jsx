import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';

import "./widget.scss";

const Widget = () => {
  const { id } = useParams(); // Access the id parameter from the route
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/viewJob/${id}`);
        setJobData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Include id in the dependency array to refetch data when id changes

  let widgetContent = null;

  if (jobData) {
    const job = jobData; // jobData is an object, not an array
    widgetContent = (
      <Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" className="job-title">
                Job Title: {job.jobTitle}
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
              </Typography><br/>
              <Link to={`/apply/${id}`} > {/* Add Link with route */}
                <Button variant="contained" color="success">Apply Now</Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }

  return (
    <div className="left">
      {loading ? <div>Loading...</div> : error ? <div>Error: {error}</div> : widgetContent}
    </div>
  );
};

export default Widget;
