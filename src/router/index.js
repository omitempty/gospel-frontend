import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
// 创建并暴露一个路由器
export default new VueRouter({
  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import("../pages/Login.vue"),
    },
    {
      path: "/home",
      name: "Home",
      redirect: "/home/empty",
      component: () => import("../pages/Home"),
      children: [
        {
          path: "empty",
          name: "Empty",
          component: () => import("../pages/Empty.vue"),
        },
        {
          path: "singlechat",
          name: "SingleChat",
          component: () => import("../pages/SingleChat.vue"),
        },
      ],
    },
    {
      path: "*",
      name: "404",
      component: () => import("../pages/NotFound.vue"),
    },

    // // 一级路由
    // {
    //     name: 'guanyu',
    //     path: '/about',
    //     component: About
    // },
    // {
    //     path: '/home',
    //     component: Home,
    //     children: [
    //         // 子路由
    //         {
    //             path: 'news',
    //             component: News
    //         },
    //         {
    //             path: 'Message',
    //             component: Message,
    //             children: [{
    //                 name: 'xiangqing',
    //                 path: 'detail',
    //                 component: Detail,
    //                 // 第一种写法 值为对象  该对象中的值都以props的形式传递个该组件
    //                 // props: { a: 1, b: 'hello' }

    //                 // props的第二种写法 值为布尔值 若布尔值为真 将所有的params属性传递给组件
    //                 // props: true

    //                 // 第三种：函数
    //                 props($route) {
    //                     return { id: $route.query.id, title: $route.query.title }
    //                 }
    //             }]
    //         }
    //     ]
    // },
  ],
});
