import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_ROOT,
});

export default axiosClient;
