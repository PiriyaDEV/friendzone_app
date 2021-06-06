import UserService from "../services/user.service";

if (localStorage.getItem("user")) {
  try {
    var user = localStorage.getItem("user");
  } catch (e) {
    alert("message: " + e);
  }
}

const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const profile = {
  namespaced: true,
  state: initialState,
  actions: {
    editData({ commit }, user) {
      return UserService.editData(user).then(
        (user) => {
          commit("editSuccess", user);
          return Promise.resolve(user);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    getSuccess(state, user) {
      state.user = user;
      state.status.loggedIn = true;
    },
    editSuccess(state, user) {
      state.user = user;
      state.status.loggedIn = true;
    }
  }
};
