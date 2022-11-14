
export default {
  state: {
    list: [],
    currentGroup: null,
  },
  mutations: {
    setGroupMessages(state, list) {
      state.list = list;

      // 消息滚动到底部，msgbox是id，不能改
      this._vm.$nextTick(() => {
        let msg = document.getElementById("msgbox");
        if (msg) {
          msg.scrollTop = msg.scrollHeight;
        }
      });
    },
    setCurrentGroup(state, group) {
      state.currentGroup = group;
    },
  },
  actions: {
    async getGroupMessages({ commit }, payload) {
      let res = await this._vm.$http.getGroupMessages(payload);
      let list = res.data.groupMessage;
      // console.log("=======get group message========");
      // console.log(list);
      commit("setGroupMessages", list);
    },
    // 只是为了统一用dispatch
    setCurrentGroup({ commit }, group) {
      // console.log("=======set current group=======");
      // console.log(group);
      commit("setCurrentGroup", group);
    },
  },
};
