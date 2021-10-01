<template>
  <vs-row class="ph-10">
    <vs-col vs-w="12">
      <vs-row
        v-for="(challenge, index) in challenges"
        :key="challenge['name']"
        class="bordered border-radius-5 p-10 mv-10 font-medium"
      >
        <vs-col vs-w="4">
          {{ challenge['name'] }}
        </vs-col>
        <vs-col vs-w="4">
          {{ processDate(challenge['created']) }}
        </vs-col>
        <vs-col
          vs-w="4"
          vs-type="flex"
          vs-justify="flex-end"
          vs-align="center"
        >
          <template v-if="getCurrentUser() === challenge['owner']">
            <span class="text-lightgrey font-small">
              Owner
            </span>
          </template>
          <template v-else>
            <span class="font-smaller">
              <span class="text-lightgrey">
                {{ challenge['likes'] ? challenge['likes'] : null }}
              </span>
              <vs-icon
                class="far fa-thumbs-up pr-10 pl-3 hover:text-primary pointer-cursor"
                @click="handleVoting('likes', index)"
              />
            </span>
            <span class="font-smaller">
              <span class="text-lightgrey">
                {{ challenge['dislikes'] ? challenge['dislikes'] : null }}
              </span>
              <vs-icon
                class="far fa-thumbs-down text-lightgrey pl-3 hover:text-dark pointer-cursor"
                @click="handleVoting('dislikes', index)"
              />
            </span>
          </template>
        </vs-col>
      </vs-row>
    </vs-col>
  </vs-row>
</template>

<script>
  import employeeMixin from '../mixins/employeeMixin';

  export default {
    name: 'AppChallenges',
    mixins: [employeeMixin],
    props: {
      savedChallenges: {
        type: Array,
        default: () => [],
      }
    },
    data: function () {
      return {
        challenges: [],
      };
    },
    watch: {
      savedChallenges: {
        immediate: true,
        deep: true,
        handler: function () {
          this.challenges = this.deepCopy(this.savedChallenges);
        }
      }
    },
    methods: {
      processDate: function (createdDate) {
        return new Date(createdDate).toDateString();
      },
      handleVoting: function (type, challengeIndex) {
        this.challenges[challengeIndex][type]++;
      }
    }
  };
</script>
