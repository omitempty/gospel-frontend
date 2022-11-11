import Vue from "vue";
import Vuex from "vuex";

import user from "./modules/user";
import friends from "./modules/friend";
import singleMessages from "./modules/singleMessages";
import groupMessages from "./modules/groupMessages";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    friends,
    singleMessages,
    groupMessages,
  },
});
