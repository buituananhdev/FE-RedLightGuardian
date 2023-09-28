import { ref } from "vue";
import axios from "axios";

const baseURL = "http://localhost:8000";

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL,
    timeout: 10000,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const login = (data) => {
    return axiosInstance.post("/auth/login", {
      username: data.username,
      password: data.password,
    });
  };

  const getListUsers = () => {
    return axiosInstance.get("/users");
  };

  const deleteUser = (id) => {
    return axiosInstance.delete(`/user/${id}`);
  };

  return {
    login,
    getListUsers,
    deleteUser,
  };
};

export default useAxios;
