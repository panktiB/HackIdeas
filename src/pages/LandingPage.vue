<template>
  <div class="height-100 width-100 bg-lightgrey ph-100 pv-60">
    <vs-row class="height-100 width-100 bordered border-radius-10 background-white">
      <vs-col
        vs-w="12"
        class="height-100 width-100"
      >
        <vs-row
          class="nav-container border-radius-10 ph-10"
          vs-align="center"
        >
          <vs-col
            vs-w="6"
            vs-type="flex"
            vs-align="center"
          >
            <div class="font-regular text-primary">
              HackIdeas
            </div>
          </vs-col>
          <vs-col
            vs-w="6"
            vs-type="flex"
            vs-align="center"
            vs-justify="flex-end"
          >
            <vs-button
              class="position-fixed logout-button pv-5 ph-8"
              type="flat"
              color="secondary"
              @click="logout"
            >
              <span class="test-logout text-underline">
                Signout
              </span>
            </vs-button>
          </vs-col>
        </vs-row>
        <vs-row class="content">
          <vs-col
            v-if="challenges.length > 1"
            vs-w="2"
          >
            <left-sidebar
              :challenges="challenges"
              @apply-filters="handleFilters"
            />
          </vs-col>
          <vs-col
            :vs-w="challenges.length > 1 ? 10 : 12"
            class="p-10"
          >
            <vs-row
              :class="! challenges.length ? 'height-100 width-100' : ''"
              vs-align="center"
            >
              <vs-col
                vs-w="12"
                :class="! challenges.length ? 'height-100 width-100' : 'pt-5'"
                vs-type="flex"
                :vs-justify="challenges.length ? 'flex-start' : 'center'"
                vs-align="center"
              >
                <div
                  class="test-create-challenge-button pointer-cursor text-primary ph-10"
                  :class="challenges.length ? 'font-small' : ''"
                  @click="openPopup"
                >
                  {{ challenges.length ? 'Create New' : 'Create a challenge' }}
                </div>
              </vs-col>
            </vs-row>
            <app-challenges
              v-if="challenges.length"
              :saved-challenges="visibleChallenges"
            />
          </vs-col>
        </vs-row>
      </vs-col>
      <create-challenge
        :show="showPopup"
        :base-challenge="challenge"
        @create-challenge="handleCreation"
        @close="closePopup"
      />
    </vs-row>
  </div>
</template>

<script>
  import challengeMixin from '../mixins/challengeMixin';
  import employeeMixin from '../mixins/employeeMixin';
  import LeftSidebar from '../components/LeftSidebar';
  import AppChallenges from '../components/AppChallenges';
  import CreateChallenge from '../components/CreateChallenge';
  import { EventBus } from '../eventBus';

  export default {
    name: 'LandingPage',
    components: { CreateChallenge, AppChallenges, LeftSidebar },
    mixins: [challengeMixin, employeeMixin],
    data: function () {
      return {
        challenges: [],
        challenge: {},
        showPopup: false,
        activeFilters: [],
      };
    },
    computed: {
      visibleChallenges: function () {
        if(this.activeFilters.length) {
          return this.challenges.filter(challenge => this.activeFilters.indexOf(challenge['tags']) > -1);
        } else {
          return this.challenges;
        }
      }
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
      handleFilters: function (activeFilters) {
        this.activeFilters = activeFilters;
      },
      openPopup: function () {
        this.showPopup = true;
      },
      closePopup: function () {
        this.showPopup = false;
      },
      logout: function () {
        EventBus.$emit('logout');
        this.routeTo('Login');
      },
    }
  };
</script>

<style scoped lang="scss">
  .nav-container {
    height: 50px;
    background-color: rgba(var(--vs-primary), 0.08);
  }
  .content {
    height: calc(100% - 50px);
  }
</style>
