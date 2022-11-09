import Vue from "vue";
import ElementUI from "element-ui";
import VueRouter from "vue-router";

import App from "./App.vue";
import router from "./router";
import api from "./api";
import store from "./store";

import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/global.css";

Vue.config.productionTip = false;

Vue.use(ElementUI, { size: "mini" });
Vue.use(VueRouter);
Vue.prototype.$http = api;

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
