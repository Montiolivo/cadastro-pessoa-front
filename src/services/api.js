import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://cadastropessoaapi-eceef3euh4e0hdbs.brazilsouth-01.azurewebsites.net/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export default api;
