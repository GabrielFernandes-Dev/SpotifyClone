import { createStore } from 'vuex';

export default createStore({
  state: {
    isLogged: false,
  },
  mutations: {
    login(state) {
      state.isLogged = true;
    },
    logout(state) {
      state.isLogged = false;
    },
  },
  actions: {
    login({ commit }) {
      commit('login');
    },
    logout({ commit }) {
      commit('logout');
    },
  },
  getters: {
    isLoggedIn: (state) => state.isLogged,
  },
});