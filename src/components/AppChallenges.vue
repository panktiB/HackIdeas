<template>
  <vs-row class="ph-10 challenge-view-container">
    <vs-col vs-w="12">
      <vs-row
        v-if="challenges.length > 1"
        vs-justify="flex-end"
      >
        <vs-dropdown vs-trigger-click>
          <vs-icon class="fas fa-sort-amount-down font-medium" />
          <vs-dropdown-menu class="font-medium fixed-width-130">
            <vs-dropdown-item
              v-for="option in sortOptions"
              :key="option['name']"
              @click="sortChallenges(option['name'])"
            >
              {{ option['label'] }}
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </vs-row>
      <vs-row
        v-for="(challenge, index) in challenges"
        :key="challenge['name']"
        class="bordered border-radius-5 p-10 mv-15 font-medium"
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
                {{ challenge['likes'].length ? challenge['likes'].length : null }}
              </span>
              <vs-icon
                class="far fa-thumbs-up pr-10 pl-3 hover:text-primary pointer-cursor"
                @click="handleVoting('likes', index)"
              />
            </span>
            <span class="font-smaller">
              <span class="text-lightgrey">
                {{ challenge['dislikes'].length ? challenge['dislikes'].length : null }}
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
  import challengeMixin from '../mixins/challengeMixin';

  export default {
    name: 'AppChallenges',
    mixins: [employeeMixin, challengeMixin],
    props: {
      savedChallenges: {
        type: Array,
        default: () => [],
      }
    },
    data: function () {
      return {
        challenges: [],
        currentUserActivity: {},
        sortOptions: [
          {
            name: 'created',
            label: 'Created Date'
          },
          {
            name: 'likes',
            label: 'Likes'
          }
        ]
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
        return new Date(createdDate).toUTCString();
      },
      handleVoting: function (type, challengeIndex) {
        let existingVotes = this.challenges[challengeIndex][type];
        let votedIndex = existingVotes.indexOf(this.getCurrentUser());
        if(votedIndex === -1) {
          this.challenges[challengeIndex][type].push(this.getCurrentUser());
        } else {
          this.challenges[challengeIndex][type].splice(votedIndex, 1);
        }
        this.setChallenges(this.challenges);
      },
      sortChallenges: function (type) {
        let typeMap = {
          'created': 'date',
          'likes': 'number'
        };
        this.challenges.sort(this.performSort(type, 'descending', typeMap[type]));
      },
      performSort: function (key, order = 'descending', type = null) {
        return (a, b) => {
          if (order === 'ascending') {
            return this.compareValues(type || 'other')(a[key], b[key]);
          } else if (order === 'descending') {
            return this.compareValues(type || 'other')(b[key], a[key]);
          }
        };
      },
      compareValues: function (type) {
        let typeMap = {
          'string': this.compareStrings,
          'date': this.compareDate,
          'number': this.compareNumbers,
        };
        return typeMap[type];
      },
      compareStrings: function (a, b) {
        return a.localeCompare(b);
      },
      compareDate: function (a, b) {
        let firstDate = new Date(a);
        let secondDate = new Date(b);
        return firstDate > secondDate ? 1 : -1;
      },
      compareNumbers: function (a, b) {
        return (a > b ? 1 : -1);
      },
    }
  };
</script>

<style scoped lang="scss">
  .challenge-view-container {
    max-height: calc(100% - 30px);
    overflow-y: auto;
  }
</style>
