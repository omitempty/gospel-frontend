import Vue from "vue";
import Vuex from "vuex";

import user from "./modules/user";
import friend from "./modules/friend";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    friend,
  },
  state: {
    test: true,
  },
  mutations: {
    flip(state) {
      console.log("test");
      state.test = !state.test;
    },
  },
  actions: {
    flip({ commit }) {
      commit("flip");
    },
  },
});
