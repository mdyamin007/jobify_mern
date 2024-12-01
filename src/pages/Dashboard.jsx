import React from "react";
import { Typography, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  height: 140,
}));

const Dashboard = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StyledPaper>
            <Typography variant="h6">Total Jobs</Typography>
            <Typography variant="h4">50</Typography>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledPaper>
            <Typography variant="h6">Total Companies</Typography>
            <Typography variant="h4">20</Typography>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledPaper>
            <Typography variant="h6">Active Users</Typography>
            <Typography variant="h4">100</Typography>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledPaper>
            <Typography variant="h6">New Applications</Typography>
            <Typography variant="h4">30</Typography>
          </StyledPaper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
