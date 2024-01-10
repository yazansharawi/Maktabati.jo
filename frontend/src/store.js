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
    setBookStoreUuid({ commit }, storeUuid) {
      commit("SET_STORE_UUID", storeUuid);
    },
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
      try {
        const response = await axios.post("user/login", { email, password });
        const { token, response: loginResponse } = response.data;
        const user = loginResponse.user;
        const uuid = loginResponse.uuid;

        if (user) {
          user.uuid = uuid;
          commit("SET_AUTHENTICATED", true);
          commit("SET_USER", user);
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem(TOKEN_KEY, token);

          if (user.type === "owner") {
            const bookstoreResponse = await axios.get(
              `book-store/get-book-store-by-uuid/${uuid}`
            );
            if (bookstoreResponse.data && bookstoreResponse.data.success) {
              const storeUuid = bookstoreResponse.data.bookstore.bookStoreUuid;
              commit("SET_STORE_UUID", storeUuid);
              router.push({ name: "ownerDashboard" });
            } else {
              console.error(
                "Bookstore data not found or unsuccessful response"
              );
            }
          } else {
            router.push({ name: "HomePage" });
          }
        } else {
          throw new Error("User data not found in response");
        }
      } catch (error) {
        let errorMessage = "Login failed";
        if (error.response && error.response.status === 401) {
          errorMessage = "Invalid credentials";
        }
        console.error(errorMessage, error);
        throw new Error(errorMessage);
      }
    },

    checkAuthentication({ commit }) {
      try {
        const token = localStorage.getItem(TOKEN_KEY);
        const storeUuid = localStorage.getItem("storeUuid");

        if (token) {
          commit("SET_AUTHENTICATED", true);

          const userJson = localStorage.getItem("user");
          if (userJson) {
            const user = JSON.parse(userJson);
            commit("SET_USER", user);
            if (storeUuid) {
              commit("SET_STORE_UUID", storeUuid);
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
