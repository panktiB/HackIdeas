import VueRouter from 'vue-router';
import LandingPage from '../pages/LandingPage';

const router = new VueRouter({
  routes: [
    {
      name: 'LandingPage',
      component: LandingPage,
      path: '/'
    }
  ],
});

export default router;
