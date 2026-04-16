import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.token = token;
  }
  return config;
});

export const authAPI = {
  signup: (data) => api.post("/user/signup", data),
  login: (data) => api.post("/user/login", data),
};

export const paymentAPI = {
  getAll: () => api.get("/payment"),
  add: (data) => api.post("/payment", data),
  edit: (id, data) => api.put(`/payment/${id}`, data),
  delete: (id) => api.delete(`/payment/${id}`),
};

export const adminAPI = {
  getAll: (filters) => api.get("/admin/payments", { params: filters }),
};

export default api;
