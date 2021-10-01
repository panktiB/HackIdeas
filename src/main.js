import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex';
import Vuesax from 'vuesax';
import globalMixin from './globalMixin';
import 'vuesax/dist/vuesax.css';
// import './assets/font-awesome/css/all.min.css';
import 'animate.css/animate.min.css';
import './assets/globalStyles.scss';
import './assets/font-awesome/css/all.min.css';

import Router from 'vue-router';
import router from './routes';
import VueDOMPurifyHTML from 'vue-dompurify-html';

Vue.use(Vuesax);
Vue.use(Vuex);
Vue.use(Router);
Vue.use(VueDOMPurifyHTML);

Vue.config.productionTip = false;
Vue.mixin(globalMixin);

Vue.directive('click-outside', {
  bind: (el, binding, vnode) => {
    el.clickOutsideEvent = (event) => {
      // here I check that click was outside the el and his children
      if (! (el === event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el['clickOutsideEvent']);
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el['clickOutsideEvent']);
  }
});

new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app');

Vue.use(VueDOMPurifyHTML, {
  default: {
    USE_PROFILES: { html: true, svg: false, mathMl: false },
    ALLOWED_TAGS: ['b'],
    FORBID_TAGS: ['script']
  }
});


