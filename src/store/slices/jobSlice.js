import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiFetchJobs,
  apiCreateJob,
  apiUpdateJob,
  apiDeleteJob,
} from "../../utils/api.js";

// Async Thunks
export const fetchJobs = createAsyncThunk("jobs/fetch", async () => {
  return await apiFetchJobs();
});

export const createJob = createAsyncThunk("jobs/create", async (jobData) => {
  return await apiCreateJob(jobData);
});

export const updateJob = createAsyncThunk(
  "jobs/update",
  async ({ id, jobData }) => {
    return await apiUpdateJob(id, jobData);
  }
);

export const deleteJob = createAsyncThunk("jobs/delete", async (id) => {
  await apiDeleteJob(id);
  return id; // Returning the deleted job's ID
});

// Slice
const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Jobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create Job
      .addCase(createJob.fulfilled, (state, action) => {
        state.jobs.push(action.payload);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // Update Job
      .addCase(updateJob.fulfilled, (state, action) => {
        const index = state.jobs.findIndex(
          (job) => job.id === action.payload.id
        );
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // Delete Job
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter((job) => job.id !== action.payload);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default jobsSlice.reducer;
