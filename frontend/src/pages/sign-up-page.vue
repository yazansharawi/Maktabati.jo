<template>
  <div>
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
            Welcome To Maktabti.Jo!
          </div>
          <div
            style="display: flex; justify-content: center; flex-direction: row"
          >
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
                  @input="formatPhoneNumber"
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
                  ref="country"
                  v-model="country"
                  :rules="[() => !!country || 'This field is required']"
                  :items="$countries"
                  label="Country"
                  placeholder="Select..."
                  required
                  density="compact"
                  variant="outlined"
                ></v-autocomplete>

                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="userDateOfBirth"
                      label="DateOfBirth"
                      readonly
                      v-bind="attrs"
                      density="compact"
                      variant="outlined"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="userDateOfBirth"
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>

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
                      class="mr-2"
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
                <a href="#" class="text-body-2 font-weight-regular"
                  >Forgot Password?</a
                >
                <v-btn
                  type="submit"
                  :color="
                    !userFirstName ||
                    !userLastName ||
                    !userPassword ||
                    !userEmail ||
                    !country
                      ? '#808080'
                      : '#AE0000'
                  "
                  block
                  :disabled="!isValidForm"
                  class="mt-2"
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
  name: "SignupPage",
  components: {},
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

      visible: false,
      menu: false,
      phoneRules: [
        (v) => !!v || "Phone number is required",
        (v) => /^[0-9+]*$/.test(v) || "Only numbers and + are allowed",
      ],
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
        this.country &&
        this.userPhoneNumber
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
          userCountry: this.country,
        };

        const response = await this.$axios.post("user", data);
        if (response.status === 201) {
          this.$router.push({ name: "userOtp" });
        } else {
          console.error("Error during sign-up:", response.data);
        }
      } catch (error) {
        console.error("Error during sign-up:", error);
      }
    },
  },
};
</script>

<style scoped>
.active-btn {
  background-color: #ae0000 !important;
}

.inactive-btn {
  background-color: #808080 !important;
  color: white !important;
}
</style>
