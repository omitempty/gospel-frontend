export default {
  state: {
    list: [],
  },
  mutations: {
    setSingleMessages(state, list) {
      console.log("========single messages=======");
      console.log(list);
      state.list = list;
    },
  },
  actions: {
    async getSingleMessages({ commit }) {
      let res = await this._vm.$http.getSingleMessages();
      let list = res.data;
      commit("setSingleMessages", list);
    },
  },
};
