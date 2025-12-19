import axios from "axios";

const getApiUrl = () => {
  return "http://localhost:8080";
};

const api = axios.create({
  baseURL: `${getApiUrl()}/api/pos`,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API Error:", err.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default api;
export const API_BASE_URL = getApiUrl();
