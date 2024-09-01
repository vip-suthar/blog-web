import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? `${window.origin}/api`
    : "http://localhost:3000/api";

const instance = axios.create({
  baseURL,
});

// instance.interceptors.request.use(
//   async (config) => {
//     const token = window.localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (err) => {
//     return Promise.reject(err);
//   }
// );

export default instance;
