import Vue from "vue";
import VueRouter from "vue-router";
import Homepage from "../views/Homepage.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Mainpage from "../views/Mainpage.vue";
import Backup from "../views/Backup.vue";
import ProfileSetting from "../views/ProfileSetting.vue";
import InterestSelect from "../views/InterestSelect.vue";
import Popup from "../components/popup/RatePopup.vue";
import Popup2 from "../components/popup/ReportPopup.vue";
import Popup3 from "../components/popup/ProfileDetail.vue";
import Popup4 from "../components/popup/EditProfile.vue";

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
  },
  {
    path: "/popup2",
    name: "Popup2",
    component: Popup2
  },
  {
    path: "/popup3",
    name: "Popup3",
    component: Popup3
  },
  {
    path: "/popup4",
    name: "Popup4",
    component: Popup4
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
