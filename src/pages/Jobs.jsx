import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Typography,
} from "@mui/material";
import { fetchJobs, deleteJob } from "../store/slices/jobSlice.js";

const Jobs = () => {
  const dispatch = useDispatch();
  const { jobs, loading } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteJob(id));
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Jobs
      </Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: "16px" }}
      >
        Add Job
      </Button>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.description}</TableCell>
                <TableCell>
                  <Button
                    color="secondary"
                    onClick={() => handleDelete(job.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default Jobs;
