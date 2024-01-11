<template>
  <v-snackbar v-model="snackbar" :timeout="6000" color="red">
    {{ snackbarText }}
    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="snackbar = false"
        >Close</v-btn
      >
    </template>
  </v-snackbar>
  <div>
    <errorDialog
      :model="errorDialogVisible"
      @update:model="errorDialogVisible = $event"
    />
    <div class="main">
      <div class="main-div">
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
            Welcome To Maktabti.Jo!
          </div>
          <div class="signIn">
            <v-sheet
              width="400"
              class="mx-auto"
              style="display: flex; flex-direction: column"
            >
              <v-form fast-fail @submit.prevent="signIn">
                <v-text-field
                  v-model="userFirstName"
                  label="Enter your First Name"
                  density="compact"
                  :rules="[() => !!userFirstName || 'This field is required']"
                  variant="outlined"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="userLastName"
                  label="Enter your family Name"
                  density="compact"
                  :rules="[() => !!userLastName || 'This field is required']"
                  variant="outlined"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="userPassword"
                  :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="visible ? 'text' : 'password'"
                  density="compact"
                  variant="outlined"
                  :rules="[
                    () => !!userPassword || 'This field is required',
                    (v) =>
                      (v && v.length >= 10) ||
                      'Password must be at least 10 characters',
                  ]"
                  label="Enter your Password"
                  @click:append-inner="visible = !visible"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="userPhoneNumber"
                  label="Phone Number"
                  density="compact"
                  variant="outlined"
                  :rules="phoneRules"
                ></v-text-field>

                <v-text-field
                  v-model="userEmail"
                  density="compact"
                  label="Enter your Email"
                  :rules="[
                    () => !!userEmail || 'This field is required',
                    () =>
                      (userEmail && userEmail.includes('@')) ||
                      'Email must contain @',
                  ]"
                  variant="outlined"
                  required
                ></v-text-field>

                <v-autocomplete
                  v-model="userCountry"
                  :rules="[() => !!userCountry || 'This field is required']"
                  :items="$countries"
                  label="Country"
                  placeholder="Select..."
                  required
                  density="compact"
                  variant="outlined"
                ></v-autocomplete>

                <v-text-field
                  v-model="userDateOfBirth"
                  density="compact"
                  placeholder="MM-DD-YY"
                  label="Enter your BirthDate"
                  :rules="[
                    () => !!userDateOfBirth || 'This field is required',
                    (v) =>
                      /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/.test(
                        v
                      ) || 'Date must be in MM-DD-YYYY format',
                  ]"
                  variant="outlined"
                  required
                ></v-text-field>

                <div
                  style="display: flex; justify-content: center; gap: 10px"
                  class="mb-2"
                >
                  <v-btn
                    v-model="userType"
                    value="regularUser"
                    elevation="0"
                    @click="setUserType('regularUser')"
                    :class="{
                      'active-btn': userType === 'regularUser',
                      'inactive-btn': userType !== 'regularUser',
                    }"
                    rounded="x-large"
                  >
                    <v-icon
                      :color="userType === 'regularUser' ? 'white' : 'white'"
                      class="mr-2"
                      >mdi-account</v-icon
                    >
                    <span
                      :style="{
                        color: userType === 'regularUser' ? 'white' : 'white',
                      }"
                      >Regular User</span
                    >
                  </v-btn>
                  <v-btn
                    v-model="userType"
                    value="owner"
                    elevation="0"
                    @click="setUserType('owner')"
                    :class="{
                      'active-btn': userType === 'owner',
                      'inactive-btn': userType !== 'owner',
                    }"
                    rounded="x-large"
                  >
                    <v-icon
                      :color="userType === 'owner' ? 'white' : 'white'"
                      class="mr-1"
                      >mdi-store</v-icon
                    >
                    <span
                      :style="{
                        color: userType === 'owner' ? 'white' : 'white',
                      }"
                      >BookStore Owner</span
                    >
                  </v-btn>
                </div>
                <v-btn
                  type="submit"
                  :color="
                    !userFirstName ||
                    !userLastName ||
                    !userPassword ||
                    !userEmail ||
                    !userCountry
                      ? '#808080'
                      : '#AE0000'
                  "
                  block
                  :disabled="!isValidForm"
                  class="mt-3"
                  elevation="0"
                >
                  <span style="color: white">Sign Up</span></v-btn
                >
              </v-form>
              <div class="mt-2">
                <p class="text-body-2">
                  Already have an account?
                  <router-link
                    :to="{
                      name: 'logInPage',
                    }"
                    >Log In</router-link
                  >
                </p>
              </div>
            </v-sheet>
          </div>
        </div>
      </div>
      <div class="sideImage">
        <img
          src="https://ucarecdn.com/f9f58be2-9e38-4b8e-9583-d7822e68d737/"
          style="max-height: 770px"
        />
      </div>
    </div>
  </div>
</template>

<script>
import errorDialog from "../components/dialogs/eventsDialog.vue";
export default {
  name: "SignupPage",
  components: {
    errorDialog,
  },
  data() {
    return {
      //User Info
      userPassword: null,
      userFirstName: null,
      userLastName: null,
      userEmail: null,
      userType: null,
      userDateOfBirth: null,
      userPhoneNumber: null,
      userCountry: null,
      errorDialogVisible: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      visible: false,
      menu: false,
      phoneRules: [
        (v) => !!v || "Phone number is required",
        (v) => /^\+\d+$/.test(v) || "Phone number must start with +",
      ],
      snackbar: false,
      snackbarText: "",
    };
  },
  computed: {
    isValidEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.userEmail);
    },
    isValidForm() {
      return (
        this.userFirstName &&
        this.userLastName &&
        this.userPassword &&
        this.isValidEmail &&
        this.userCountry &&
        this.userPhoneNumber &&
        this.userDateOfBirth
      );
    },
  },
  methods: {
    setUserType(type) {
      this.userType = type;
    },
    async signIn() {
      try {
        let data = {
          userPassword: this.userPassword,
          userFirstName: this.userFirstName,
          userLastName: this.userLastName,
          userEmail: this.userEmail,
          userDateOfBirth: this.userDateOfBirth,
          userType: this.userType,
          userPhoneNumber: this.userPhoneNumber,
          userCountry: this.userCountry,
        };

        const response = await this.$axios.post("user", data);
        if (response.status === 201) {
          this.$store.dispatch("signUpSuccess", {
            user: response.data.user,
            token: response.data.token,
            userUuid: response.data.userUuid,
          });
          this.$router.push({
            name: "userOtp",
            params: { uuid: response.data.userUuid },
          });
        } else {
          this.snackbarText = "Something went wrong, please try again later";
          this.snackbar = true;
        }
      } catch (error) {
        console.error("Error during sign-up:", error);
        this.snackbarText = "Something went wrong, please try again later";
        this.snackbar = true;
      }
    },
  },
};
</script>

<style scoped>
.signIn {
  display: flex;
  justify-content: center;
  flex-direction: row;
}
.sideImage {
  display: flex;
  flex: 1;
  flex-direction: row-reverse;
}
.main {
  display: flex;
  background-color: #f3f0e9;
  height: 100vh;
}
.main-div {
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: row-reverse;
}
.active-btn {
  background-color: #ae0000 !important;
}

.inactive-btn {
  background-color: #808080 !important;
  color: white !important;
}
@media (max-width: 1200px) {
  .main {
    display: flex;
    background-color: #f3f0e9;
    height: 100vh;
    justify-content: center;
    align-items: center;
  }
  .sideImage {
    display: none;
  }
  .signIn {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: none;
  }
  .main-div {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  }
}
</style>
