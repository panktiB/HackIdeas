let challengeMixin = {
  data: function () {
    return {
      tags: ['UI', 'Tech', 'Optimize', 'Feature'],
      challenges: [],
      defaultChallenge: {
        name: '',
        description: '',
        owner: null,
        tags: [],
        likes: 0,
        dislikes: 0,
      }
    };
  },
  methods: {
    createChallenge: function (challenge) {
      this.challenges.push(this.deepCopy(challenge));
    },
    getChallenges: function () {
      return this.deepCopy(this.challenges);
    },
    getBaseChallenge: function () {
      return this.deepCopy(this.defaultChallenge);
    },
    getExistingTags: function () {
      return this.tags;
    }
  }
};

export default challengeMixin;
