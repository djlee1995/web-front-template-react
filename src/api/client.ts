// src/api/client.ts
import axios from "axios";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:8080",
  timeout: 15000,
});
