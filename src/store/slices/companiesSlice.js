import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiFetchCompanies,
  apiCreateCompany,
  apiUpdateCompany,
  apiDeleteCompany,
} from "../../utils/api.js";

// Fetch Companies
export const fetchCompanies = createAsyncThunk(
  "companies/fetch",
  async (_, thunkAPI) => {
    try {
      return await apiFetchCompanies();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Create Company
export const createCompany = createAsyncThunk(
  "companies/create",
  async (data, thunkAPI) => {
    try {
      return await apiCreateCompany(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update Company
export const updateCompany = createAsyncThunk(
  "companies/update",
  async ({ id, data }, thunkAPI) => {
    try {
      return await apiUpdateCompany(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Delete Company
export const deleteCompany = createAsyncThunk(
  "companies/delete",
  async (id, thunkAPI) => {
    try {
      await apiDeleteCompany(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const companiesSlice = createSlice({
  name: "companies",
  initialState: {
    companies: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Companies
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Company
      .addCase(createCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.companies.push(action.payload);
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Company
      .addCase(updateCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCompany = action.payload;
        const index = state.companies.findIndex(
          (c) => c.id === updatedCompany.id
        );
        if (index !== -1) {
          state.companies[index] = updatedCompany;
        }
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Company
      .addCase(deleteCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = state.companies.filter(
          (company) => company.id !== action.payload
        );
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = companiesSlice.actions;

export default companiesSlice.reducer;
