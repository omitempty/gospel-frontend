export default {
  state: {
    list: [],
  },
  mutations: {
    setGroupMessages(state, list) {
      console.log("========group messages=======");
      console.log(list);
      state.list = list;
    },
  },
  actions: {
    async getGroupMessages({ commit }) {
      let res = await this._vm.$http.getGroupMessages();
      let list = res.data;
      commit("setGroupMessages", list);
    },
  },
};
