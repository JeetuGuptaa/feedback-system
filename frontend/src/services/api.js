import axios from "axios";

export const api = axios.create({
  baseURL: "https://feedback-system-jpdo.onrender.com",
  headers: { "Content-Type": "application/json" },
});
