import { createLocalVue, mount } from '@vue/test-utils';
import LeftSidebar from '../../src/components/LeftSidebar';
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
  wrapper = mount(LeftSidebar, {
    mixins: [globalMixin, challengeMixin],
    propsData: {
      challenges: [
        {
          name: 'first name',
          description: 'description',
          owner: 123455,
          tags: 'Tech',
          likes: 1,
          dislikes: 0,
          created: new Date(),
        },
        {
          name: 'second name',
          description: 'description',
          owner: 123455,
          tags: 'Tech',
          likes: 1,
          dislikes: 0,
          created: new Date(),
        },
        {
          name: 'third name',
          description: 'description',
          owner: 123455,
          tags: 'UI',
          likes: 1,
          dislikes: 0,
          created: new Date(),
        }
      ]
    },
    data: function () {
      return {
        activeFilters: [],
        availableFilters: [],
      }
    }, localVue, router
  });
});

describe('Left sidebar', () => {
  it('Available filters detected correctly', () => {
    expect(wrapper.vm.availableFilters).toStrictEqual(['Tech', 'UI']);
  });
});

afterEach(() => {
  wrapper.destroy();
})
