import VueRouter from 'vue-router';
import Login from '../components/Login';
import AppRegister from '../components/AppRegister';
import LandingPage from '../pages/LandingPage';

const router = new VueRouter({
  routes: [
    {
      name: 'Login',
      component: Login,
      path: '/login'
    },
    {
      name: 'Register',
      component: AppRegister,
      path: '/register'
    },
    {
      name: 'LandingPage',
      component: LandingPage,
      path: '/home'
    },
  ],
});

export default router;
