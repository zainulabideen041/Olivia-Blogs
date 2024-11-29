import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend-umber-chi-47.vercel.app",
});

export default axiosInstance;
