import Vue from "vue";
import VueRouter from "vue-router";
import Homepage from "../views/Homepage.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Mainpage from "../views/Mainpage.vue";
import Backup from "../components/popup/PointDetail.vue";
import ProfileSetting from "../views/ProfileSetting.vue";
import InterestSelect from "../views/InterestSelect.vue";
import Popup from "../components/popup/WaitBox.vue";
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
    path: "/backup",
    name: "Backup",
    component: Backup
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
    path: "/popup",
    name: "Popup",
    component: Popup
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
