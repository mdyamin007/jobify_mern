import axios from "axios";

// Set up the base URL for your API
const API_BASE_URL = "http://localhost:5000/api/v1"; // Replace with your actual API base URL

// Create an axios instance for convenience
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor for adding auth tokens to requests (if needed)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Assume token is stored in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors globally (optional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error);
    return Promise.reject(error);
  }
);

// Company APIs
export const apiFetchCompanies = async () => {
  const response = await api.get("/companies");
  return response.data;
};

export const apiCreateCompany = async (data) => {
  const response = await api.post("/companies", data);
  return response.data;
};

export const apiUpdateCompany = async (id, data) => {
  const response = await api.put(`/companies/${id}`, data);
  return response.data;
};

export const apiDeleteCompany = async (id) => {
  const response = await api.delete(`/companies/${id}`);
  return response.data;
};

// Job APIs
export const apiFetchJobs = async () => {
  const response = await api.get("/jobs");
  return response.data;
};

export const apiCreateJob = async (data) => {
  const response = await api.post("/jobs", data);
  return response.data;
};

export const apiUpdateJob = async (id, data) => {
  const response = await api.put(`/jobs/${id}`, data);
  return response.data;
};

export const apiDeleteJob = async (id) => {
  const response = await api.delete(`/jobs/${id}`);
  return response.data;
};

// AI Route API
export const apiGenerateJobDescription = async (data) => {
  const response = await api.post("/ai/generate", data);
  return response.data;
};

// User APIs
export const apiFetchUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const apiDeleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

export default api;
