import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import { auth } from "./auth.module";
import { profile } from "./user.module";
import User from "../models/user";
import Gender from "../models/gender";

export default new Vuex.Store({
  state: {
    user: new User(""),
    gender: new Gender("")
  },
  mutations: {},
  actions: {},
  modules: {
    auth,
    profile,
  },
});