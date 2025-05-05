import axios from "axios";

export const API_BASE_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_URL_PRODUCTION
    : import.meta.env.VITE_API_URL_DEVELOPMENT;

const api = axios.create({
  baseURL: API_BASE_URL,
});

const token = localStorage.getItem("jwt");

api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

api.defaults.headers.post["Content-Type"] = "application/json";

export default api;
