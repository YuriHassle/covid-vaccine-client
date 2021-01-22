import Vue from 'vue';
import App from './App.vue';
import VueMask from 'v-mask';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VueMask);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
