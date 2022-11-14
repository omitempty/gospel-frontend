export default {
  state: {
    list: [],
  },
  mutations: {
    setGroups(state, list) {
      state.list = list;
    },
  },
  actions: {
    async getGroups({ commit }) {
      let res = await this._vm.$http.getGroups();
      res.data.myGroup.sort((a, b) => {
        if (!a.groupMessageVo) return 1;
        else if (!b.groupMessageVo) return -1;
        var ta = new Date(a.groupMessageVo.sendTime);
        var tb = new Date(b.groupMessageVo.sendTime);
        if (ta > tb) return -1;
        else if (ta < tb) return 1;
        else return 0;
      });
      let list = res.data.myGroup;
      console.log("========groups list=======");
      console.log(list);
      commit("setGroups", list);
    },
  },
};
