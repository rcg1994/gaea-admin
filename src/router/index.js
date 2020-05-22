import Vue from "vue";
import VueRouter from "vue-router";
import InfoManagePages from "./info-manage-pages";
import NotFindPage from "../pages/404.vue";
import MainLayout from "../layouts/main.vue";
import LoginLayout from "../layouts/login.vue";
import Helper from "@/libs/Helper";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "hash",
  routes: [
    {
      path: "*",
      component: NotFindPage,
    },
    {
      path: "/",
      redirect: '/home',
      name: "main-layout",
      component: MainLayout,
      children: [
        {
          path: '/home',
          meta: {
            title: '首页',
          },
          component: () => import(`../pages/home.vue`),
        },
        ...InfoManagePages
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  Helper.dispatchEvent("app/route/change/start");
  next();
});

router.afterEach((to, from) => {
  // to and from are both route objects.
  Helper.dispatchEvent("app/route/change/end");
});

export default router;
