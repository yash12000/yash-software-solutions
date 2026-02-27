import axios from "axios";

export const API = axios.create({
  baseURL: "https://yash-software-solutions.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});