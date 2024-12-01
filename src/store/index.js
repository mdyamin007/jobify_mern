import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import companyReducer from "./slices/companiesSlice.js";
import jobReducer from "./slices/jobSlice.js";
import userReducer from "./slices/userSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    companies: companyReducer,
    jobs: jobReducer,
    users: userReducer,
  },
});

export default store;
