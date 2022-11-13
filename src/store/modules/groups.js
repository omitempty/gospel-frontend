export default {
  state: {
    list: [],
  },
  mutations: {
    setGroups(state, list) {
      state.list = list;
    },
  },
  actions: {
    async getGroups({ commit }) {
      let res = await this._vm.$http.getGroups();
      let list = res.data.myGroup;
      console.log("========groups list=======");
      console.log(list);
      commit("setGroups", list);
    },
  },
};
