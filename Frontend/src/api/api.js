import axios from "axios";

const API = axios.create({
  baseURL: "https://syncora-lwpe.onrender.com/api",
  withCredentials: true,
});

export default API;