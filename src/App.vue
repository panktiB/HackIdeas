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

export default {
  name: 'App',
  data: function () {
    return {
      isLoggedIn: false,
    };
  },
  beforeMount () {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    EventBus.$on('set-logged-in', this.handleLogin);
  },
  beforeDestroy () {
    localStorage.removeItem('isLoggedIn');
    EventBus.$off('set-logged-in', this.handleLogin);
  },
  mounted () {
    if(! this.isLoggedIn) {
      this.routeTo('Login');
    }
  },
  methods: {
    handleLogin: function () {
      this.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');
    },
    handleLogout: function () {
      this.isLoggedIn = false;
      localStorage.setItem('isLoggedIn', 'false');
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
