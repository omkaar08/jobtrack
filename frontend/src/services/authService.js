import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || '';
const API_AUTH_URL = `${BASE_URL}/api/auth`;

const authService = {
  // Register a new user
  register: async (fullName, email, password) => {
    const response = await axios.post(`${API_AUTH_URL}/register`, {
      fullName,
      email,
      password,
    });
    return response.data;
  },

  // Log in an existing user
  login: async (email, password) => {
    const response = await axios.post(`${API_AUTH_URL}/login`, {
      email,
      password,
    });
    return response.data;
  },

  // Get current logged-in user profile
  getCurrentUser: async (token) => {
    const response = await axios.get(`${API_AUTH_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

export default authService;
