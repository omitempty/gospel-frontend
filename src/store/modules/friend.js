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
      console.log(res.data.FriendsAndLastMessage);
      res.data.FriendsAndLastMessage.sort((a, b) => {
        if (!a.singleMessage) return 1;
        else if (!b.singleMessage) return -1;
        var ta = new Date(a.singleMessage.sendTime);
        var tb = new Date(b.singleMessage.sendTime);
        if (ta > tb) return -1;
        else if (ta < tb) return 1;
        else return 0;
      });
      // 如果后端字段改了，一个中间层是很有必要的，我可以在中间层做转换对前端屏蔽修改
      let list = res.data.FriendsAndLastMessage.map((item) => {
        return {
          ...item.friend,
          lastMessage: item.singleMessage,
        };
      });
      commit("setFriends", list);
    },
  },
};
