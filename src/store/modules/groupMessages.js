export default {
  state: {
    list: [],
    currentGroup: null,
  },
  mutations: {
    setGroupMessages(state, list) {
      state.list = list;
    },
    setCurrentGoup(state, group) {
      state.currentGroup = group;
    },
  },
  actions: {
    async getGroupMessages({ commit }) {
      let res = await this._vm.$http.getGroupMessages();
      let list = res.data;
      console.log("=======get group message========");
      console.log(list);
      commit("setGroupMessages", list);
    },
    // 只是为了统一用dispatch
    setCurrentGroup({ commit }, group) {
      console.log("=======set current group=======");
      console.log(group);
      commit("setCurrentGroup", group);
    },
  },
};
