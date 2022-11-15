import Vue from "vue";
import ElementUI from "element-ui";
import VueRouter from "vue-router";
import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";

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

var token = localStorage.getItem("token");
if (token) {
  Vue.use(
    new VueSocketIO({
      debug: true,
      connection: SocketIO("http://localhost:9999", {
        // autoConnect: false,
        query: "token=" + localStorage.getItem("token"),
      }),
    })
  );
} else {
  alert("请重新登录");
}

new Vue({
  render: (h) => h(App),
  router,
  store,
  sockets: {
    // 可以用来测试 是否链接成功了
    connect: function () {
      console.log("链接成功");
    },
    disconnect() {
      console.log("Socket 断开");
    },
    Group_Message: function () {},
  },
}).$mount("#app");
