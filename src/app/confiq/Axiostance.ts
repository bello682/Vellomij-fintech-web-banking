import axios from "axios";
import { LOGOUT_SUCCESS } from "../store/auth/actionType/logoutActionType"; // Adjust your path
import store from "../store/auth/store"; // Adjust your path

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8006/Api_Url";
let isLoggingOut = false;

const Axiotance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
Axiotance.interceptors.request.use(
  (config) => {
    // Only run on the client side
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor
Axiotance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const errorMessage = error.response?.data?.message?.toLowerCase() || "";

    if (status === 401 && !isLoggingOut) {
      const isPinError = errorMessage.includes("pin");
      const isAuthRequest = // /screens/auth/LoginScreen
        originalRequest.url.includes("/FintechUsers/login") ||
        originalRequest.url.includes("/FintechUsers/register");

      if (!isAuthRequest && !isPinError) {
        isLoggingOut = true;

        // Clear web storage
        if (typeof window !== "undefined") {
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("userId");
          // FORCE THE REDIRECT IMMEDIATELY
          // This ensures the user is moved to the login page
          // even if the rest of your React state hasn't updated yet.
          window.location.href = "/screens/auth/LoginScreen";
        }

        store.dispatch({ type: LOGOUT_SUCCESS });

        setTimeout(() => {
          isLoggingOut = false;
        }, 5000);
      }
    }

    return Promise.reject(error);
  },
);

export default Axiotance;
