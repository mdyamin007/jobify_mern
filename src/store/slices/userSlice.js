import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetchUsers, apiDeleteUser } from "../../utils/api.js";

// Async Thunks
export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  return await apiFetchUsers();
});

export const deleteUser = createAsyncThunk("users/delete", async (id) => {
  await apiDeleteUser(id);
  return id; // Returning the deleted user's ID
});

// Slice
const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Delete User
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
