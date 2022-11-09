export default {
  state: {
    userInfo: JSON.parse(window.localStorage.getItem("userInfo")) || null,
  },
  mutations: {
    login(state, userInfo) {
      console.log("store----------");
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
    asyncLogin({ commit }, userInfo) {
      commit("login", userInfo);
    },
    asyncLogout({ commit }) {
      commit("logout");
    },
  },
};
