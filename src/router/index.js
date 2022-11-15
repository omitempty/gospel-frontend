import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
// 创建并暴露一个路由器
const router = new VueRouter({
  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import("../pages/Login.vue"),
    },
    {
      path: "/home",
      name: "Home",
      redirect: "/home/singlechat",
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
        {
          path: "groupchat",
          name: "GroupChat",
          component: () => import("../pages/GroupChat.vue"),
        },
        {
          path: "search",
          name: "Search",
          component: () => import("../pages/Search.vue"),
        },
        {
          path: "tutor",
          name: "Tutor",
          component: () => import("../pages/Tutor.vue"),
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

// router.beforeEach((to, from, next) => {
//   const userIsLogin = store.state.user.userInfo;
//   if (to.meta.requiresAuth) {
//     if (userIsLogin) {
//       next();
//     } else {
//       // alert('请先登录再进行此操作!')
//       next({
//         path: "/login",
//         /** 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由 */
//         query: { redirect: to.fullPath },
//       });
//     }
//   } else {
//     next();
//   }
// });

export default router;
