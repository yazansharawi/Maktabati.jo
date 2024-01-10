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
            height: auto;
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
            Welcome Back!
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
              <v-form @submit.prevent="login">
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
                <p class="text-body-2 font-weight-regular">
                  <router-link
                    :to="{
                      name: 'forgetPasswordPage',
                    }"
                  >
                    Forgot Password?</router-link
                  >
                </p>
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
              <div>
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
export default {
  name: "LoginPage",
  data() {
    return {
      userEmail: "",
      password: "",
      visible: false,
    };
  },

  methods: {
    async login() {
      try {
        await this.$store.dispatch("login", {
          email: this.userEmail,
          password: this.password,
        });
      } catch (error) {
        console.error("Login Error:", error);
      }
    },
  },
};
</script>

<style scoped></style>
