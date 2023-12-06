<template>
  <div>
    <!-- <Nav :isGetUserPage="true" /> -->
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f3f0e9;
      "
    >
      <v-sheet
        border
        class="pt-8 pb-8 px-8 ma-4 mx-auto"
        max-width="350"
        width="100%"
      >
        <h3 class="text-h6 mb-1">Account verification</h3>

        <div class="text-body-2 font-weight-light">
          Enter the code we just sent to your Email
          <span class="font-weight-black text-primary">{{
            $store.getters.user.email
          }}</span>
        </div>

        <v-otp-input
          v-model="otp"
          class="mt-3 ms-n2"
          placeholder="0"
          length="6"
          variant="underlined"
        ></v-otp-input>

        <v-divider class="mt-3 mb-6"></v-divider>
        <div style="display: flex; justify-content: center">
          <v-btn
            color="#AE0000"
            block
            text="Verify"
            elevation="0"
            @click="verifyOtp"
          ></v-btn>
        </div>
      </v-sheet>
    </div>
  </div>
</template>

<script>
// import Nav from "../components/Navs/main-navbar.vue";
export default {
  name: "OtpPage",
  data() {
    return {
      otp: "",
    };
  },
  // components: {
  //   Nav,
  // },
  methods: {
    async verifyOtp() {
      try {
        const userUuid = this.$route.params.uuid;

        const response = await this.$axios.post("user/verify-otp/" + userUuid, {
          otp: this.otp,
        });
        if (response.status === 200 && response.data.verified) {
          if (response.data.userType === "regularUser") {
            this.$router.push({ name: "UserPresona" });
          } else {
            this.$router.push({ name: "ownerDashboard" });
          }
        } else {
          console.error("OTP verification failed");
        }
      } catch (error) {
        console.error("Error during OTP verification:", error);
      }
    },
  },
};
</script>

<style scoped></style>
