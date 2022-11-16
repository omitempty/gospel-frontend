export default {
  state: {
    list: [],
  },
  mutations: {
    // 这才是语义化的命名啊，谁知道login为什么要存储用户信息
    setPanel(state, list) {
      state.list = list;
    },
  },
  actions: {
    async getPanel({ commit }) {
      let res = await this._vm.$http.getTeacherAndPeers();
      let res2 = await this._vm.$http.getMyStudents();
      let list = res.data.list;
      console.log(res2.data);
      if (!res2.data.getError) {
        list = [...list, ...res2.data.student_list];
      }
      list.sort((a, b) => {
        if (!a.lastMessage) return 1;
        else if (!b.lastMessage) return -1;
        var ta = new Date(a.lastMessage.sendTime);
        var tb = new Date(b.lastMessage.sendTime);
        if (ta > tb) return -1;
        else if (ta < tb) return 1;
        else return 0;
      });
      // 如果后端字段改了，一个中间层是很有必要的，我可以在中间层做转换对前端屏蔽修改
      list = list.map((item) => {
        return {
          ...item.user,
          lastMessage: item.lastMessage,
        };
      });
      commit("setPanel", list);
    },
  },
};
