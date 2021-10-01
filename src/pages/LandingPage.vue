<template>
  <vs-row class="height-100 width-100">
    <vs-col
      vs-w="2"
      class="bordered-right bg-lightgrey"
    >
      <left-sidebar :current-user="getCurrentUser()" />
    </vs-col>
    <vs-col vs-w="10">
      <template v-if="challenges.length">
        <app-challenges />
      </template>
      <template v-else>
        <vs-button @click="openPopup">
          Create a challenge
        </vs-button>
      </template>
    </vs-col>
    <create-challenge
      :show="showPopup"
      :base-challenge="challenge"
      @create-challenge="handleCreation"
      @close="closePopup"
    />
  </vs-row>
</template>

<script>
  import challengeMixin from '../mixins/challengeMixin';
  import employeeMixin from '../mixins/employeeMixin';
  import LeftSidebar from '../components/LeftSidebar';
  import AppChallenges from '../components/AppChallenges';
  import CreateChallenge from '../components/CreateChallenge';

  export default {
    name: 'LandingPage',
    components: { CreateChallenge, AppChallenges, LeftSidebar },
    mixins: [challengeMixin, employeeMixin],
    data: function () {
      return {
        challenges: [],
        challenge: {},
        showPopup: false
      };
    },
    beforeMount () {
      this.challenges = this.getChallenges();
      this.challenge = this.getBaseChallenge();
      this.challenge['owner'] = this.getCurrentUser();
    },
    methods: {
      openPopup: function () {
        this.showPopup = true;
      },
      closePopup: function () {
        this.showPopup = false;
      },
      handleCreation: function (challenge) {
        console.log('created challenge: ', challenge);
        this.closePopup();
      }
    }
  };
</script>
