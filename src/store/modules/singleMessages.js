export default {
  state: {
    list: [],
    currentFriend: null,
    currentPanel: null,
  },
  mutations: {
    setSingleMessages(state, list) {
      state.list = list;
      this._vm.$nextTick(() => {
        let msg = document.getElementById("msgbox");
        if (msg) {
          msg.scrollTop = msg.scrollHeight;
        }
      });
    },
    setCurrentFriend(state, friend) {
      state.currentFriend = friend;
    },
    setCurrentPanel(state, panel) {
      state.currentPanel = panel;
    },
  },
  actions: {
    async getSingleMessages({ commit }, payload) {
      let res = await this._vm.$http.getSingleMessages(payload);
      // 取数据忘改了md
      let list = res.data.singleMessage;
      // console.log("========get single messages=======");
      // console.log(list);
      commit("setSingleMessages", list);
    },

    setCurrentFriend({ commit }, friend) {
      // console.log("========set current friend=======");
      // console.log(friend);
      // 这边名字写错了，平时写代码还是要先想好再写
      commit("setCurrentFriend", friend);
    },
    setCurrentPanel({ commit }, panel) {
      // console.log("========set current panel=======");
      // console.log(panel);
      // 这边名字写错了，平时写代码还是要先想好再写
      commit("setCurrentPanel", panel);
    },
  },
};
