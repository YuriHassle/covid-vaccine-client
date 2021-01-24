import axios from 'axios';
import Swal from 'sweetalert2';
import router from './router';

const axiosInstance = axios.create({
  //baseURL: 'https://covid-vaccine-server.herokuapp.com/api'
  //baseURL: 'https://imuniza.manaus.am.gov.br/api'
  baseURL: 'http://localhost:8000/api'
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
    console.log(error.response);
    if (error.response.status === 401) {
      console.log('entrou');
      Swal.fire({
        icon: 'info',
        title: 'Sessão expirada',
        text:
          'A sua sessão expirou. Você será redirecionado para a página de login em instantes.',
        showConfirmButton: false,
        timer: 2500
      }).then(() => {
        this.$store.dispatch('logout');
        router.push({ name: 'login' });
      });
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
  }
};
