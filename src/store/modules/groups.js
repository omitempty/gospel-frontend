export default {
  state: {
    list: [],
  },
  mutations: {
    setGroups(state, list) {
      console.log("========groups list=======");
      console.log(list);
      state.list = list;
    },
  },
  actions: {
    async getGroups({ commit }) {
      let res = await this._vm.$http.getGroups();
      let list = res.data;
      commit("setGroups", list);
    },
  },
};
