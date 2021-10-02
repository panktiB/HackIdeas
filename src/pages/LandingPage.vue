<template>
  <vs-row class="height-100 width-100">
    <vs-col
      vs-w="2"
      class="bordered-right bg-lightgrey"
    >
      <left-sidebar :current-user="getCurrentUser()" />
    </vs-col>
    <vs-col
      vs-w="10"
      class="p-10"
    >
      <vs-row
        :class="! challenges.length ? 'height-100 width-100' : ''"
        vs-align="center"
      >
        <vs-col
          v-if="challenges.length"
          vs-w="6"
          class="text-primary"
        >
          Challenges
        </vs-col>
        <vs-col
          :vs-w="! challenges.length ? 12 : 6"
          :class="! challenges.length ? 'height-100 width-100' : ''"
          vs-type="flex"
          vs-justify="flex-end"
        >
          <vs-button
            :class="! challenges.length ? 'height-100 width-100 font-large' : 'ph-8 pv-5'"
            type="flat"
            @click="openPopup"
          >
            Create
          </vs-button>
        </vs-col>
      </vs-row>
      <app-challenges
        v-if="challenges.length"
        :saved-challenges="challenges"
      />
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
      this.updateChallenges();
      this.resetChallenge();
    },
    methods: {
      updateChallenges: function () {
        this.challenges = this.getChallenges();
      },
      resetChallenge: function () {
        this.challenge = this.getBaseChallenge();
        this.challenge['owner'] = this.getCurrentUser();
      },
      handleCreation: function (challenge) {
        challenge['created'] = new Date();
        this.setChallenge(challenge);
        this.updateChallenges();
        this.resetChallenge();
        this.closePopup();
      },
      openPopup: function () {
        this.showPopup = true;
      },
      closePopup: function () {
        this.showPopup = false;
      },
    }
  };
</script>
