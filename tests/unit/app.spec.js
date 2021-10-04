import { createLocalVue, shallowMount } from '@vue/test-utils';
import App from '../../src/App';
import globalMixin from '../../src/globalMixin';
import Vuesax from 'vuesax';

import Router from 'vue-router';
import router from '../../src/routes';

const localVue = createLocalVue({router: router});
localVue.use(Vuesax);
localVue.use(Router);

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(App, {
    mixins: [globalMixin],
    data: function () {
      return {
        isLoggedIn: true,
        currentUser: null,
      }
    }, localVue, router
  });
});

describe('App', () => {
  it('Routing to Login by default', () => {
    expect(wrapper.vm.$route.name).toBe('Login')
  });
  it('Routing to Landing page by default if user is already logged in', () => {
    wrapper.vm.routeTo('App');
    wrapper.setData({isLoggedIn: true});
    wrapper.vm.setDefaultRoute();
    expect(wrapper.vm.$route.name).toBe('LandingPage');
  });
  it('Logging in sets current user', () => {
    wrapper.vm.handleLogin(123456);
    expect(wrapper.vm.currentUser).toBe(123456);
  });
  it('Logging out removes current user', () => {
    wrapper.vm.handleLogout();
    expect(wrapper.vm.currentUser).toBe(null);
  })
})

afterEach(() => {
  wrapper.destroy()
})
