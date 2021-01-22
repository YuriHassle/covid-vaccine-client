import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import VueMask from 'v-mask';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueSwal from 'vue-swal';

Vue.config.productionTip = false;

Vue.use(VueMask);
Vue.use(VueAxios, axios);
Vue.use(VueSwal);
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app');
