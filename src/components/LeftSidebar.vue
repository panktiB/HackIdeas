<template>
  <vs-row>
    <vs-col vs-w="12">
      <vs-row class="font-medium pv-10 pl-10 text-primary bordered-bottom">
        <vs-icon
          icon="fas fa-user"
          icon-pack="fa5"
        />
        {{ currentUser }}
      </vs-row>
      <vs-row />
      <vs-button
        class="position-fixed logout-button pv-5 ph-8"
        type="border"
        @click="logout"
      >
        Logout
      </vs-button>
    </vs-col>
  </vs-row>
</template>

<script>
  import { EventBus } from '../eventBus';

  export default {
    name: 'LeftSidebar',
    props: {
      currentUser: {
        type: [String, Number],
        default: null,
      }
    },
    methods: {
      logout: function () {
        EventBus.$emit('logout');
        this.routeTo('Login');
      }
    }
  };
</script>

<style scoped lang="scss">
  .logout-button {
    bottom: 10px;
    left: 10px;
  }
</style>
