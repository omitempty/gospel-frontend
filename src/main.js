import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueRouter from "vue-router";
import router from "./router";
import api from "./api";
import "./assets/css/global.css";

Vue.config.productionTip = false;

Vue.use(ElementUI, { size: "mini" });
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.prototype.$http = api;

new Vue({
  render: (h) => h(App),
  router: router,
}).$mount("#app");
