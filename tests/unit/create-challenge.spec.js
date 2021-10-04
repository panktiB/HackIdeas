import { createLocalVue, mount } from '@vue/test-utils';
import CreateChallenge from '../../src/components/CreateChallenge';
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
  wrapper = mount(CreateChallenge, {
    mixins: [employeeMixin, globalMixin, challengeMixin],
    propsData: {
      baseChallenge: {}
    },
    data: function () {
      return {
        challenge: {},
      }
    }, localVue, router
  });
});

describe('Create Challenge', () => {
  it('Can challenge be saved',  () => {
    let component = wrapper.vm;
    let challenge = component.getBaseChallenge();
    challenge['name'] = 'Some challenge';
    challenge['description'] = 'Some kind of description';
    challenge['tags'] = 'Tech';
    wrapper.setData({challenge: challenge});
    expect(component.isValid).toBe(true);
  });
  it('Challenge can not be saved', () => {
    let component = wrapper.vm;
    let localChallenge = component.getBaseChallenge();
    wrapper.setData({challenge: localChallenge});
    expect(component.isValid).toBe(false);
  })
  it('Challenge can be created',  () => {
    let component = wrapper.vm;
    let challenge = component.getBaseChallenge();
    challenge['name'] = 'Some challenge';
    challenge['description'] = 'Some kind of description';
    challenge['tags'] = 'Tech';
    component.setChallenges([{
      name: 'First challenge',
      description: 'Random description',
      owner: 123456,
      tags: ['Tech'],
      likes: 0,
      dislikes: 0,
      created: new Date(),
    }])
    expect(component.validateChallenge(challenge)).toBe(true);
  });
  it('Challenge can not be created',  () => {
    let component = wrapper.vm;
    let challenge = component.getBaseChallenge();
    challenge['name'] = 'First challenge';
    challenge['description'] = 'Some kind of description';
    challenge['tags'] = 'Tech';
    component.setChallenges([{
      name: 'First challenge',
      description: 'Random description',
      owner: 123456,
      tags: ['Tech'],
      likes: 0,
      dislikes: 0,
      created: new Date(),
    }])
    expect(component.validateChallenge(challenge)).toBe(false);
  });
});

afterEach(() => {
  wrapper.destroy();
})
