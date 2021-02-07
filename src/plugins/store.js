import Vue from 'vue';
import Vuex from 'vuex';
import { api } from '@/services.js';
import { currentDate } from '../helpers/utils';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    user: {
      id: '',
      cpf: '',
      name: '',
      email: '',
    },
    user_applications: [],
  },
  mutations: {
    UPDATE_USER(state, payload) {
      state.user = Object.assign(state.user, payload);
    },
    UPDATE_USER_APPLICATIONS(state, payload) {
      state.user_applications = payload;
    },
    ADD_USER_APPLICATION(state, payload) {
      state.user_applications.unshift(payload);
    },
  },
  actions: {
    getUser(context) {
      return api.get(`/user`).then(({ data }) => {
        context.commit('UPDATE_USER', data);
      });
    },
    getUserApplications(context) {
      const user_id = localStorage.getItem('user_id');
      return api
        .get(
          `/applications?user_id=${user_id}&application_date=${currentDate()}`
        )
        .then(({ data }) => {
          context.commit('UPDATE_USER_APPLICATIONS', data.data);
        });
    },
    addUserApplication(context, payload) {
      const application = { ...payload };
      application.citizen = { ...payload.citizen };
      context.commit('ADD_USER_APPLICATION', application);
    },
    login(context, payload) {
      return api.post('/login', payload).then(({ data }) => {
        if (data.data.successful_login) {
          context.commit('UPDATE_USER', data.data.user);
          localStorage.setItem('token', data.data.access_token);
          /*salvando o user_id no localStore para que ele esteja sempre disponível
           * a action getUser() leva um tempo para recuperar o dado
           */
          localStorage.setItem('user_id', data.data.user.id);
        }
        return data;
      });
    },
    logout(context) {
      context.commit('UPDATE_USER', {
        id: '',
        cpf: '',
        name: '',
        email: '',
      });
      if (localStorage.getItem('token')) {
        window.localStorage.removeItem('token');
      }
      if (localStorage.getItem('user_id')) {
        window.localStorage.removeItem('user_id');
      }
    },
  },
});
