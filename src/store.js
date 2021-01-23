import Vue from 'vue';
import Vuex from 'vuex';
import { api } from '@/services.js';
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    usuario: {
      id: '',
      cpf: '',
      name: '',
      email: ''
    }
  },
  mutations: {
    UPDATE_USER(state, payload) {
      state.usuario = Object.assign(state.usuario, payload);
    }
  },
  actions: {
    login(context, payload) {
      return api.post('/login', payload).then(({ data }) => {
        if (data.data.length !== 0) {
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
      window.localStorage.removeItem('token');
    }
  }
});
