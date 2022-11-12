export default {
  state: {
    userInfo: JSON.parse(window.localStorage.getItem("userInfo")) || null,
  },
  mutations: {
    login(state, userInfo) {
      state.userInfo = userInfo;
    },
    logout(state) {
      state.userInfo = null;
    },
  },
  actions: {
    // 这个没啥用啊，而且写错了， 要定义成async函数，好像是那个破教程这么写的
    // 早上看的时候比较急，也不懂vuex，现在忘了
    login({ commit }, userInfo) {
      console.log("======login=======");
      commit("login", userInfo);
    },
    logout({ commit }) {
      commit("logout");
    },
  },
};
