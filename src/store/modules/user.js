export default {
  state: {
    userInfo: JSON.parse(window.localStorage.getItem("userInfo")) || null,
  },
  mutations: {
    login(state, userInfo) {
      console.log("========store userInfo=======");
      console.log(userInfo);
      state.userInfo = userInfo;
      window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
    },
    logout(state) {
      state.userInfo = null;
      window.localStorage.removeItem("userInfo");
    },
  },
  actions: {
    // 这个没啥用啊，而且写错了， 要定义成async函数，好像是那个破教程这么写的
    // 早上看的时候比较急，也不懂vuex，现在忘了
    asyncLogin({ commit }, userInfo) {
      console.log("aysncLogin");
      commit("login", userInfo);
    },
    asyncLogout({ commit }) {
      commit("logout");
    },
  },
};
