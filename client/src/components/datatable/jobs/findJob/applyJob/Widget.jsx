import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import StarIcon from "@mui/icons-material/Star";
import Sidebar from "../../../../sidebar/Sidebar";
import Navbar from "../../../../navbar/Navbar";


import "./widget.scss";

const Widget = () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applyJob, setApplyJob] = useState('');
  const navigate = useNavigate();

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
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.put(`http://localhost:4000/updateJobPost/${id}`, {
        applyJob,
      });
  
      console.log('Job post updated:', response.data);
      navigate(`/findJobs/viewJobById/${id}`);

    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  let widgetContent = null;

  if (jobData) {
    const job = jobData;
    widgetContent = (
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={8}>
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
                <i><StarIcon sx={{ fontSize: 15, color: "goldenrod" }} /></i>
                &nbsp;&nbsp;&nbsp;<i>Ethiopia</i>
              </Typography>
              <br />
              <Typography variant="body2" className="payment-info">
                <span className="formInput">
                  <label htmlFor="applyJob"><h3>Write your Job cover letter here</h3></label>
                  <textarea
                    id="applyJob"
                    name="applyJob"
                    value={applyJob}
                    onChange={(e) => setApplyJob(e.target.value)}
                    rows="3"
                    required={true}
                    style={{ width: "100%", padding: "5px" }}
                  />
                </span>
              </Typography>
              <br />
              <Button variant="contained" color="success" onClick={handleSubmit}>
                Send
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="left">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            widgetContent
          )}
        </div>
      </div>
    </div>
  );
};

export default Widget;
