import { createLocalVue, mount } from '@vue/test-utils';
import AppRegister from '../../src/components/AppRegister';
import employeeMixin from '../../src/mixins/employeeMixin';
import globalMixin from '../../src/globalMixin';
import Vuesax from 'vuesax';

const localVue = createLocalVue();
localVue.use(Vuesax);

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
    }, localVue
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
})

afterEach(() => {
  wrapper.destroy()
})
