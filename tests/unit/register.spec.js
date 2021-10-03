import { createLocalVue, mount } from '@vue/test-utils';
import AppRegister from '../../src/components/AppRegister';
import employeeMixin from '../../src/mixins/employeeMixin';
import globalMixin from '../../src/globalMixin';
import Vuesax from 'vuesax';

import Router from 'vue-router';
import router from '../../src/routes';

const localVue = createLocalVue({router: router});
localVue.use(Vuesax);
localVue.use(Router)

let wrapper;

beforeEach(() => {
  wrapper = mount(AppRegister, {
    mixins: [employeeMixin, globalMixin],
    data: function () {
      return {
        employeeID: null,
        errorMessage: '',
        existingEmployees: [],
      }
    }, localVue, router
  })
})

describe('Register', () => {
  it('Valid employee ID', () => {
    wrapper.setData({
      employeeID: 123456
    })
    expect(wrapper.vm.isValid).toBe(true)
  })
  it('Invalid employee ID', () => {
    wrapper.setData({
      employeeID: 123
    })
    expect(wrapper.vm.isValid).toBe(false)
  })
  it('Successful registration', async () => {
    wrapper.setData({
      existingEmployees: [],
      employeeID: 123456
    })
    await wrapper.find('.test-registration').trigger('click')
    expect(wrapper.vm.errorMessage.length).toBe(0)
  })
  it('Unsuccessful registration', async () => {
     wrapper.setData({
      existingEmployees: [123456],
      employeeID: 123456
    })
    await wrapper.find('.test-registration').trigger('click')
    expect(wrapper.vm.errorMessage.length).toBeGreaterThan(0)
  })
  it('Go to login page', async() => {
    await wrapper.find('.test-goto-login').trigger('click')
    expect(wrapper.vm.$route.name).toBe('Login')
  })
  it('Home page loaded', async () => {
    wrapper.setData({
      existingEmployees: [],
      employeeID: 123456
    })
    await wrapper.find('.test-registration').trigger('click')
    expect(wrapper.vm.$route.name).toBe('LandingPage')
  })
})

afterEach(() => {
  wrapper.destroy()
})
