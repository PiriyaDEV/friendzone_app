import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import { auth } from "./auth.module";
import { profile } from "./user.module";
import User from "../models/user";

export default new Vuex.Store({
  state: {
    user: new User("")
  },
  mutations: {},
  actions: {},
  modules: {
    auth,
    profile,
  },
});