import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/layout.vue";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Layout,
    redirect: '/login',
    children: [
      {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue")
      },
      {
        path: "/phone",
        name: '电话管理',
        component: Home,
      },
      {
        path: "/banner",
        name: 'banner管理',
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Banner.vue")
      },
      {
        path: "/notice",
        name: '声明编辑',
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Notice.vue")
      },
      {
        path: "/note",
        name: '笔记',
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/note.vue")
      }
    ]
  },
  {
    path: "/login",
    name: '登录页面',
    component: Login,
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});



export default router;
