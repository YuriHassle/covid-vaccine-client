import axios from 'axios';
import Swal from 'sweetalert2';
import router from './router';
import store from './store';

const axiosInstance = axios.create({
  //baseURL: 'https://covid-vaccine-server.herokuapp.com/api',
  //baseURL: 'https://imuniza.manaus.am.gov.br/api'
  baseURL: 'http://localhost:8000/api',
});

axiosInstance.interceptors.request.use(
  request => {
    const token = localStorage.getItem('token');
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      if (router.history.current.name !== 'login') {
        router.push({ name: 'login' }).then(() => {
          store.dispatch('logout');
          Swal.fire({
            icon: 'info',
            title: 'Sessão expirada',
            text:
              'A sua sessão expirou. Você foi redirecionado para a página de login.',
            showConfirmButton: false,
            timer: 2500,
          });
        });
      }
    }
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
