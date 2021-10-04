<template>
  <div
    id="app"
    class="font-regular"
  >
    <router-view />
  </div>
</template>

<script>

import { EventBus } from './eventBus';
import employeeMixin from './mixins/employeeMixin';

export default {
  name: 'App',
  mixins: [employeeMixin],
  data: function () {
    return {
      isLoggedIn: false,
      currentUser: null,
    };
  },
  beforeMount () {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    EventBus.$on('set-logged-in', this.handleLogin);
    EventBus.$on('logout', this.handleLogout);
  },
  beforeDestroy () {
    this.handleLogout();
    EventBus.$off('set-logged-in', this.handleLogin);
    EventBus.$off('logout', this.handleLogout);
  },
  mounted () {
    this.setDefaultRoute();
  },
  methods: {
    setDefaultRoute: function () {
      if(this.$route.path === '/' || this.$route.path === '') {
        if(this.isLoggedIn) {
          this.routeTo('LandingPage');
        } else {
          this.routeTo('Login');
        }
      }
    },
    handleLogin: function (user) {
      this.isLoggedIn = true;
      this.currentUser = user;
      this.setCurrentUser(this.currentUser);
      localStorage.setItem('isLoggedIn', 'true');
    },
    handleLogout: function () {
      this.isLoggedIn = false;
      localStorage.setItem('isLoggedIn', 'false');
      this.currentUser = null;
      this.removeCurrentUser();
    }
  }
};
</script>

<style lang="scss">
  #app {
    height: 100vh !important;
    width: 100vw !important;
  }
</style>
