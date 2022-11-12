export default {
  state: {
    list: [],
    currentFriend: null,
  },
  mutations: {
    setSingleMessages(state, list) {
      state.list = list;
    },
    setCurrentFriend(state, friend) {
      state.currentFriend = friend;
    },
  },
  actions: {
    async getSingleMessages({ commit }, friendId, myId) {
      let res = await this._vm.$http.getSingleMessages(friendId, myId);
      console.log(res.data);
      let list = res.data;
      console.log("========get single messages=======");
      console.log(list);
      commit("setSingleMessages", list);
    },

    setCurrentFriend({ commit }, friend) {
      console.log("========set current friend=======");
      console.log(friend);
      // 这边名字写错了，平时写代码还是要先想好再写
      commit("setCurrentFriend", friend);
    },
  },
};
