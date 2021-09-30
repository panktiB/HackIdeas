 let globalMixin = {
  methods: {
    deepCopy: function (payload) {
      try {
        return JSON.parse(JSON.stringify(payload));
      } catch (e) {
        console.log('error in payload', payload);
      }
    },
    routeTo: function (path, payload, query = null) {
      this.$router.replace({
        name: path,
        params: payload,
        query: query
      }).catch(error => {
        console.log('error in routing to path : ', path, error);
      });
    },
  }
};

export default globalMixin;
