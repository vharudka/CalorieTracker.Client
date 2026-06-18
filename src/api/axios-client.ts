import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://localhost:7027/api"
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // Do NOT attach token for login or registration
  const skipAuth =
    config.url?.includes("/auth/login") ||
    config.url?.includes("/auth/register");

  if (!skipAuth && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;