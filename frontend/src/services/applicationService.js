import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || '';
const API_BASE_URL = `${BASE_URL}/api/applications`;

// Add Authorization header token dynamically
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const applicationService = {
  // Fetch all applications with optional search & status filter
  getAllApplications: async (search = '', status = '') => {
    const params = {};
    if (search && search.trim() !== '') params.search = search.trim();
    if (status && status.trim() !== '' && status !== 'ALL') params.status = status.trim();

    const response = await axios.get(API_BASE_URL, { params });
    return response.data;
  },

  // Fetch summary statistics for the dashboard
  getStats: async () => {
    const response = await axios.get(`${API_BASE_URL}/stats`);
    return response.data;
  },

  // Fetch single application details by ID
  getApplicationById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  // Create a new job application
  createApplication: async (applicationData) => {
    const response = await axios.post(API_BASE_URL, applicationData);
    return response.data;
  },

  // Update an existing job application
  updateApplication: async (id, applicationData) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, applicationData);
    return response.data;
  },

  // Delete a job application by ID
  deleteApplication: async (id) => {
    await axios.delete(`${API_BASE_URL}/${id}`);
  },
};

export default applicationService;
