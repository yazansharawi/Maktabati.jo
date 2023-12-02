<template>
  <div>
    <!-- <errorDialog :model="errorDialogModel" /> -->
    <div style="display: flex; background-color: #f3f0e9">
      <div
        style="
          display: flex;
          flex: 1;
          align-items: center;
          flex-direction: row-reverse;
        "
      >
        <div
          style="
            height: 400px;
            background-color: white;
            width: 500px;
            border-radius: 10px;
          "
        >
          <div
            style="
              font-weight: 400;
              font-size: 35px;
              line-height: 40px;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100px;
              color: #494949;
            "
          >
            Welcome To Back!
          </div>
          <div
            style="
              display: flex;
              justify-content: center;
              flex-direction: row;
              gap: 10px;
            "
          >
            <v-sheet
              width="400"
              class="mx-auto"
              style="display: flex; flex-direction: column; gap: 20px"
            >
              <v-form @submit.prevent="handleLogin">
                <v-text-field
                  v-model="userEmail"
                  label="Email"
                  :rules="[() => !!userEmail || 'This field is required']"
                  density="compact"
                  variant="outlined"
                  prepend-inner-icon="mdi-email"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="visible ? 'text' : 'password'"
                  density="compact"
                  :rules="[() => !!password || 'This field is required']"
                  variant="outlined"
                  prepend-inner-icon="mdi-lock"
                  label="Enter your Password"
                  @click:append-inner="visible = !visible"
                  required
                ></v-text-field>
                <a href="#" class="text-body-2 font-weight-regular"
                  >Forgot Password?</a
                >
                <v-btn
                  type="submit"
                  color="#AE0000"
                  block
                  :disabled="!userEmail || !password"
                  class="mt-3"
                  elevation="0"
                >
                  <span style="color: white">Log In</span>
                </v-btn>
              </v-form>
              <div class="mt-2">
                <p class="text-body-2">
                  Don't have an account?
                  <router-link
                    :to="{
                      name: 'SignUpPage',
                    }"
                    >Sign Up</router-link
                  >
                </p>
              </div>
            </v-sheet>
          </div>
        </div>
      </div>
      <div style="display: flex; flex: 1; flex-direction: row-reverse">
        <img
          src="https://ucarecdn.com/f9f58be2-9e38-4b8e-9583-d7822e68d737/"
          style="max-height: 770px"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "../store";
// import errorDialog from "../components/dialogs/eventsDialog.vue";

export default {
  name: "LoginPage",
  data() {
    return {
      visible: false,
    };
  },

  // components: {
  //   errorDialog,
  // },
  setup() {
    const store = useStore();
    

    const userEmail = ref(null);
    const password = ref(null);

    const handleLogin = async () => {
      try {
        await store.dispatch("login", {
          email: userEmail.value,
          password: password.value,
        });
      } catch (error) {
        console.log("error", error);
      }
    };

    return {
      userEmail,
      password,
      handleLogin,
    };
  },
};
</script>

<style scoped></style>
