import Vue from "vue";
import Vuex from "vuex";
import { getUser } from "../Utilities/backend";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
  },
  getters: {},
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    async setUser({ commit }) {
      console.log("Hello, world!");
      const user = await getUser();
      commit("SET_USER", user);
    },
  },
  modules: {},
});
