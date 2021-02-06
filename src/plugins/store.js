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
      email: '',
    },
  },
  mutations: {
    UPDATE_USER(state, payload) {
      state.user = Object.assign(state.user, payload);
    },
  },
  actions: {
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
    getUser(context) {
      return api.get(`/user`).then(({ data }) => {
        context.commit('UPDATE_USER', data);
      });
    },
  },
});
