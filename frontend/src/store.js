import { createStore, useStore as baseUseStore } from "vuex";
import axios from "axios";
import router from "@/router";

const TOKEN_KEY = "auth_token";

const store = createStore({
  state: {
    isAuthenticated: false,
    user: null,
  },
  mutations: {
    SET_AUTHENTICATED(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    loginSuccess({ commit }, { user, token }) {
      commit("SET_AUTHENTICATED", true);
      commit("SET_USER", user);

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem(TOKEN_KEY, token);
    },
    logout({ commit }) {
      commit("SET_AUTHENTICATED", false);
      commit("SET_USER", null);
      localStorage.removeItem(TOKEN_KEY);
    },
    async login({ commit }, { email, password }) {
      try {
        const response = await axios.post("user/login", {
          email,
          password,
        });

        const { user, token } = response.data;

        commit("SET_AUTHENTICATED", true);
        commit("SET_USER", user);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem(TOKEN_KEY, token);

        router.push({ name: "HomePage" });
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
    checkAuthentication({ commit }) {
      try {
        const token = localStorage.getItem(TOKEN_KEY);

        if (token) {
          commit("SET_AUTHENTICATED", true);

          const userJson = localStorage.getItem("user");

          if (userJson) {
            const user = JSON.parse(userJson);
            commit("SET_USER", user);
          } else {
            console.warn("User data in localStorage is undefined.");
          }
        }
      } catch (error) {
        console.error("Error in checkAuthentication:", error);
      }
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    user: (state) => state.user,
  },
});

export function useStore() {
  return baseUseStore();
}

export default store;
