import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import Login from './views/Login';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ],
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.login)) {
    if (!window.localStorage.token) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
