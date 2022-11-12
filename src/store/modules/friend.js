export default {
  state: {
    list: [],
  },
  mutations: {
    // 这才是语义化的命名啊，谁知道login为什么要存储用户信息
    setFriends(state, list) {
      state.list = list;
    },
  },
  actions: {
    async getFriends({ commit }) {
      let res = await this._vm.$http.getFriends();
      let list = res.data.friendList;

      // 最好在这边直接filter一下，或者在下面来个计算属性
      commit("setFriends", list);
    },
  },
};