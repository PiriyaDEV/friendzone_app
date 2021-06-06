import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Homepage",
    component: () => import("../views/Homepage.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/mainpage",
    name: "Mainpage",
    component: () => import("../views/Mainpage.vue")
  },
  {
    path: "/profileSetting",
    name: "ProfileSetting",
    component: () => import("../views/ProfileSetting.vue")
  },
  {
    path: "/interestSelect",
    name: "InterestSelect",
    component: () => import("../views/InterestSelect.vue")
  },
  {
    path: "/admin",
    name: "Adminpage",
    component: () => import("../views/Adminpage.vue")
  },
  {
    path: "/policy",
    name: "Policy",
    component: () => import("../views/Policy.vue")
  },
  {
    path: "*",
    name: "Notfound",
    component: () => import("../views/Notfound.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
