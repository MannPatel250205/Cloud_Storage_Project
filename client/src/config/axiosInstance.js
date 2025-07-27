import axios from "axios";
import { getStoredToken, clearAuthData } from "../utils/tokenUtils.js";

const BASE_URL="http://localhost:6600/api/"
const axiosInstance=axios.create()

axiosInstance.defaults.baseURL=BASE_URL;

// Add a request interceptor to automatically add the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid or expired
      clearAuthData();
      // Redirect to login page or show login modal
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;