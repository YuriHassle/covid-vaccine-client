import Vue from 'vue';
import App from './App.vue';
import VueMask from 'v-mask';
import router from './plugins/router';
import store from './plugins/store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(VueMask);
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
