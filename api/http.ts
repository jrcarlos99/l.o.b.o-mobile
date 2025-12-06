import axios from "axios";

export const api = axios.create({
  baseURL: "https://usuarios-service-2e2t.onrender.com/",
  timeout: 10000,
});
