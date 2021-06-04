import Vue from "vue";
import VueRouter from "vue-router";
import Homepage from "../views/Homepage.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Mainpage from "../views/Mainpage.vue";
import ProfileSetting from "../views/ProfileSetting.vue";
import InterestSelect from "../views/InterestSelect.vue";
import Adminpage from "../views/Adminpage.vue";
import Notfound from "../views/Notfound.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Homepage",
    component: Homepage
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/mainpage",
    name: "Mainpage",
    component: Mainpage
  },
  {
    path: "/profileSetting",
    name: "ProfileSetting",
    component: ProfileSetting
  },
  {
    path: "/interestSelect",
    name: "InterestSelect",
    component: InterestSelect
  },
  {
    path: "/admin",
    name: "Adminpage",
    component: Adminpage
  },
  {
    path: "*",
    name: "Notfound",
    component: Notfound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
