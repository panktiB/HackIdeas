import { createLocalVue, mount } from '@vue/test-utils';
import LandingPage from '../../src/pages/LandingPage';
import employeeMixin from '../../src/mixins/employeeMixin';
import challengeMixin from '../../src/mixins/challengeMixin';
import globalMixin from '../../src/globalMixin';
import Vuesax from 'vuesax';

import Router from 'vue-router';
import router from '../../src/routes';

const localVue = createLocalVue({router: router});
localVue.use(Vuesax);
localVue.use(Router);

let wrapper;

beforeEach(() => {
  wrapper = mount(LandingPage, {
    mixins: [employeeMixin, globalMixin, challengeMixin],
    data: function () {
      return {
        challenges: [],
        challenge: {},
        showPopup: false,
      }
    }, localVue, router
  });
});

describe('Landing Page', () => {
  it('Create popup can be opened', async () => {
    await wrapper.find('.test-create-challenge-button').trigger('click');
    expect(wrapper.vm.showPopup).toBe(true);
  })
  it('Challenge can be saved', async () => {
    let component = wrapper.vm;
    let challenge = component.getBaseChallenge();
    let challenges = component.getChallenges();
    challenge['name'] = 'Some challenge';
    challenge['description'] = 'Some kind of description';
    challenge['owner'] = 123456;
    challenge['tags'] = 'Tech';
    challenge['created'] = new Date();
    await wrapper.find('.test-create-challenge-button').trigger('click');
    component.setChallenge(challenge);
    challenges = component.getChallenges();
    expect(challenges.length).toBeGreaterThan(0);
  });
});

describe('Testing logout', () => {
  it('Can logout', async () => {
    await wrapper.find('.test-logout').trigger('click');
    expect(wrapper.vm.$route.name).toBe('Login');
  });
})

afterEach(() => {
  wrapper.destroy();
})
