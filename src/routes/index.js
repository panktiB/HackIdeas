import VueRouter from 'vue-router';
import Login from '../components/Login';

const router = new VueRouter({
  routes: [
    {
      name: 'Login',
      component: Login,
      path: ''
    }
  ],
});

export default router;
