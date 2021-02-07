import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home';
import UpdatePassword from '../views/UpdatePassword';
import UpdateUserData from '../views/UpdateUserData';
import Login from '../views/Login';
import Swal from 'sweetalert2';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/alterarsenha',
      name: 'updatepassword',
      component: UpdatePassword,
    },
    {
      path: '/alterardados',
      name: 'updateuserdata',
      component: UpdateUserData,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: 'smooth' });
  },
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.login)) {
    if (!window.localStorage.token) {
      Swal.fire({
        icon: 'info',
        title: 'Sessão expirada',
        text:
          'A sua sessão expirou. Você será redirecionado para a página de login em instantes.',
        showConfirmButton: false,
        timer: 2500,
      }).then(() => {
        this.$store.dispatch('logout');
        next('/login');
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
