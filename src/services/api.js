import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.2:8081/web/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

export default api;
