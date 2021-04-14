import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import { auth } from "./auth.module";
import { profile } from "./user.module";
// import User from "../models/user";

export default new Vuex.Store({
  state: {
    userInfo: [
      {
        user_id: null,
        username: null,
        password: null,
        email: null,
        firstname: null,
        lastname: null,
        birthdate: null,
        gender_id: null,
        phone: null,
        profile_pic: null,
        bio: null,
        role_id: null,
        status_id: null
      },
    ],
  },
  mutations: {},
  actions: {},
  modules: {
    auth,
    profile,
  },
});