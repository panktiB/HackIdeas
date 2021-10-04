<template>
  <vs-row>
    <vs-col
      vs-w="12"
      class="pt-60 pl-10"
    >
      <vs-row
        v-for="(tag, index) in availableFilters"
        :key="index"
        class="pb-10"
      >
        <vs-checkbox
          v-model="activeFilters"
          icon-pack="fa5"
          size="small"
          icon="fas fa-check"
          :vs-value="tag"
          class="font-medium"
          @change="updateChallenges()"
        >
          <span :class="`select-filter-${tag}`">
            {{ tag }}
          </span>
        </vs-checkbox>
      </vs-row>
    </vs-col>
  </vs-row>
</template>

<script>

  export default {
    name: 'LeftSidebar',
    props: {
      challenges: {
        type: Array,
        default: () => []
      }
    },
    data: function () {
      return {
        activeFilters: [],
        availableFilters: [],
      };
    },
    watch: {
      challenges: {
        immediate: true,
        deep: true,
        handler: function () {
          let tags = this.challenges.map(challenge => {
            return challenge['tags'];
          });
          this.availableFilters = [...new Set(tags)];
        }
      }
    },
    methods: {
      updateChallenges: function () {
        this.$emit('apply-filters', this.activeFilters);
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
