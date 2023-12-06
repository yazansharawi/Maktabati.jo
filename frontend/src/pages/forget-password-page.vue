<template>
  <div>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f3f0e9;
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
            font-size: 25px;
            line-height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100px;
            color: #494949;
          "
        >
          {{ formTitle }}
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
            <v-form @submit.prevent="handleChange">
              <v-text-field
                v-if="showEmailField"
                v-model="userEmail"
                label="Email"
                :rules="[() => !!userEmail || 'This field is required']"
                density="compact"
                variant="outlined"
                prepend-inner-icon="mdi-email"
              />
              <v-text-field
                v-if="showOtpField"
                v-model="userNewOtp"
                label="OTP"
                :rules="[() => !!userNewOtp || 'This field is required']"
                density="compact"
                variant="outlined"
                prepend-inner-icon="mdi-check-decagram"
              />
              <v-text-field
                v-if="showPasswordField"
                v-model="userNewpassword"
                :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                :rules="[
                  () => !!userNewpassword || 'This field is required',
                  (v) =>
                    (v && v.length >= 10) ||
                    'Password must be at least 10 characters',
                ]"
                variant="outlined"
                prepend-inner-icon="mdi-lock"
                label="Enter your New Password"
                @click:append-inner="visible = !visible"
                required
              />
              <v-btn
                type="submit"
                color="#AE0000"
                block
                :disabled="submitButtonDisabled"
                class="mt-3 mb-4"
                elevation="0"
                :loading="loading"
              >
                <span style="color: white">{{ submitButtonText }}</span>
              </v-btn>
            </v-form>
          </v-sheet>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgetPasswordPage",
  data() {
    return {
      userEmail: null,
      userNewOtp: null,
      userNewpassword: null,
      visible: false,
      showEmailField: true,
      showOtpField: false,
      showPasswordField: false,
      loading: false,
    };
  },
  computed: {
    formTitle() {
      if (this.showEmailField) {
        return "Please enter your email";
      } else {
        return "Please Check your email for the OTP";
      }
    },
    submitButtonText() {
      if (this.showEmailField) {
        return "Send OTP to Email";
      } else {
        return "Reset Password";
      }
    },
    submitButtonDisabled() {
      if (this.showEmailField) {
        return !this.userEmail;
      } else {
        return !this.userNewOtp || !this.userNewpassword;
      }
    },
  },
  methods: {
    async handleChange() {
      if (this.showEmailField) {
        try {
          this.loading = true;
          const response = await this.$axios.post("user/forget-password", {
            userEmail: this.userEmail,
          });
          if (response.status === 200) {
            this.showEmailField = false;
            this.showOtpField = true;
            this.showPasswordField = true;
          }
        } catch (error) {
          console.error("Error sending email:", error);
        } finally {
          this.loading = false;
        }
      } else if (this.showOtpField) {
        if (this.userNewOtp && this.userNewpassword) {
          try {
            const response = await this.$axios.post("user/reset-password", {
              userEmail: this.userEmail,
              otp: this.userNewOtp,
              newPassword: this.userNewpassword,
            });
            if (response.status === 200) {
              this.showEmailField = false;
              this.showOtpField = false;
              this.showPasswordField = false;
              this.$router.push({ name: "logInPage" });
            }
          } catch (error) {
            console.error("Error resetting password:", error);
          }
        } else {
          console.log("OTP and new password are required");
        }
      }
    },
  },
};
</script>

<style scoped></style>
