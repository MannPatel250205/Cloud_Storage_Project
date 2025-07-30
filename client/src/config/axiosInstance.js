import axios from "axios";
import { getStoredToken, clearAuthData } from "../utils/tokenUtils.js";

const BASE_URL = import.meta.env.VITE_API_URL || "https://cloud-storage-project-backend.onrender.com/api/"
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
})

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