import axios from "axios";

const BASE_URL = "http://localhost:49866/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export default api;
