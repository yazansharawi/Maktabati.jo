import { createStore, useStore as baseUseStore } from "vuex";
import axios from "axios";
import router from "@/router";

const TOKEN_KEY = "auth_token";

const store = createStore({
  state: {
    isAuthenticated: false,
    user: null,
    storeUuid: null,
  },
  mutations: {
    SET_AUTHENTICATED(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_STORE_UUID(state, storeUuid) {
      state.storeUuid = storeUuid;
    },
  },
  actions: {
    signUpSuccess({ commit }, { user, token, userUuid }) {
      commit("SET_AUTHENTICATED", true);
      commit("SET_USER", { ...user, uuid: userUuid });
      localStorage.setItem("user", JSON.stringify({ ...user, uuid: userUuid }));
      localStorage.setItem(TOKEN_KEY, token);
    },

    signUpSuccessBookStore({ commit, state }, { storeUuid, token }) {
      console.log("store", storeUuid);
      const updatedUser = { ...state.user, storeUuid };
      commit("SET_STORE_UUID", storeUuid);
      commit("SET_USER", updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      localStorage.setItem(TOKEN_KEY, token);
    },

    loginSuccess({ commit }, { user, token, uuid }) {
      const userWithUuid = { ...user, uuid };

      commit("SET_AUTHENTICATED", true);
      commit("SET_USER", userWithUuid);
      localStorage.setItem("user", JSON.stringify(userWithUuid));
      localStorage.setItem(TOKEN_KEY, token);
    },
    logout({ commit }) {
      commit("SET_AUTHENTICATED", false);
      commit("SET_USER", null);
      localStorage.removeItem(TOKEN_KEY);
    },
    async login({ commit }, { email, password }) {
      const response = await axios.post("user/login", { email, password });
      const { user, token } = response.data;
      console.log("response.uuid", response.data.response.uuid);
      user.uuid = response.data.response.uuid;
      let uuid = response.data.response.uuid;

      commit("SET_AUTHENTICATED", true);
      commit("SET_USER", user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem(TOKEN_KEY, token);

      if (user.type === "owner") {
        console.log("uuid", uuid);
        const bookstoreResponse = await axios.get(
          `book-store/get-book-store-by-uuid/${uuid}`
        );
        console.log("bookstoreResponse", bookstoreResponse);
        if (bookstoreResponse.data && bookstoreResponse.data.success) {
          this.$store.dispatch(
            "setBookStoreUuid",
            bookstoreResponse.data.bookStore.bookStoreUuid
          );
        }
      } else {
        router.push({ name: "HomePage" });
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
            if (user.storeUuid) {
              commit("SET_STORE_UUID", user.storeUuid);
            }
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
    storeUuid: (state) => state.storeUuid,
  },
});

store.dispatch("checkAuthentication");
export function useStore() {
  return baseUseStore();
}

export default store;
