import Vue from 'vue';
import Vuex from 'vuex';
import { api } from '@/services.js';
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    user: {
      id: '',
      cpf: '',
      name: '',
      email: ''
    }
  },
  mutations: {
    UPDATE_USER(state, payload) {
      state.user = Object.assign(state.user, payload);
    }
  },
  actions: {
    login(context, payload) {
      return api.post('/login', payload).then(({ data }) => {
        if (data.data.successful_login) {
          context.commit('UPDATE_USER', data.data.user);
          localStorage.setItem('token', data.data.access_token);
        }
        return data;
      });
    },
    logout(context) {
      context.commit('UPDATE_USER', {
        id: '',
        cpf: '',
        name: '',
        email: ''
      });
      if (localStorage.getItem('token')) {
        window.localStorage.removeItem('token');
      }
    },
    getUser(context) {
      return api.get(`/user`).then(({ data }) => {
        context.commit('UPDATE_USER', data);
      });
    }
  }
});
