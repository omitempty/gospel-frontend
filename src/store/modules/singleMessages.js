export default {
  state: {
    list: [],
    currentFriend: null,
  },
  mutations: {
    setSingleMessages(state, list) {
      state.list = list;
      this._vm.$nextTick(() => {
        let msg = document.getElementById("msgbox");
        console.log("===========scroll debug=========");
        console.log(msg);
        if (msg) {
          msg.scrollTop = msg.scrollHeight - 30;
        }
      });
    },
    setCurrentFriend(state, friend) {
      state.currentFriend = friend;
    },
  },
  actions: {
    async getSingleMessages({ commit }, payload) {
      let res = await this._vm.$http.getSingleMessages(payload);
      // 取数据忘改了md
      let list = res.data.singleMessage;
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
