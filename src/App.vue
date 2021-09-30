<template>
  <div
    id="app"
    class="font-regular"
  >
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
};
</script>

<style lang="scss">
  #app {
    height: 100vh !important;
    width: 100vw !important;
  }
</style>
