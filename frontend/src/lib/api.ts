import axios from "axios";
import { redirect } from "react-router";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    // Normalizes backend responses returning { error: true, message: "..." }
    if (response.data && response.data.error === true) {
      return Promise.reject({
        response,
        message: response.data.message || "An unexpected error occurred.",
      });
    }
    return response;
  },
  (error) => {
    // Global 401 handler: Redirect or clear session if auth fails
    if (error.response?.status === 401) {
      throw redirect("/login");
    }

    if (error.response?.data) {
      return Promise.reject({
        response: error.response,
        message: error.response.data.message || "Server or Validation Error",
      });
    }

    return Promise.reject(error);
  },
);
