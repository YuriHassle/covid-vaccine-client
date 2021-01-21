import axios from "axios";

const axiosInstance = axios.create({
  //baseURL: "https://covid-vaccine-server.herokuapp.com/api",
  //baseURL: "https://imuniza.manaus.am.gov.br/api",
  baseURL: "http://localhost:8000/api",
});

axiosInstance.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export const api = {
  get(endpoint) {
    return axiosInstance.get(endpoint);
  },
  post(endpoint, body) {
    return axiosInstance.post(endpoint, body);
  },
  delete(endpoint) {
    return axiosInstance.delete(endpoint);
  },
  put(endpoint, body) {
    return axiosInstance.put(endpoint, body);
  },
};
