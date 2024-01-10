<template>
  <div class="main-div">
    <Nav :isGetUserPage="true" />
    <div style="display: flex; align-items: center; justify-content: center">
      <div
        style="
          height: 570px;
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
          Register your Shop
        </div>
        <div
          style="display: flex; justify-content: center; flex-direction: row"
        >
          <v-sheet
            width="400"
            class="mx-auto"
            style="display: flex; flex-direction: column"
          >
            <v-form fast-fail @submit.prevent="register">
              <v-text-field
                v-model="shopName"
                label="Enter your Shop Name"
                density="compact"
                :rules="[() => !!shopName || 'This field is required']"
                variant="outlined"
                required
              ></v-text-field>
              <v-text-field
                v-model="shopEmail"
                label="Enter your Shop Email"
                density="compact"
                :rules="[
                  () => !!shopEmail || 'This field is required',
                  () =>
                    (shopEmail && shopEmail.includes('@')) ||
                    'Email must contain @',
                ]"
                variant="outlined"
                required
              ></v-text-field>

              <v-text-field
                v-model="shopPhoneNumber"
                label="Enter your Shop Phone Number"
                density="compact"
                variant="outlined"
                :rules="phoneRules"
              ></v-text-field>

              <v-text-field
                v-model="shopWebsite"
                density="compact"
                label="Enter your Shop Website"
                :rules="[
                  () => !!shopWebsite || 'This field is required',
                  () => validURL(shopWebsite) || 'Enter a valid website URL',
                ]"
                variant="outlined"
                required
              ></v-text-field>

              <v-text-field
                v-model="shopAddress"
                density="compact"
                label="Enter your Shop Address"
                :rules="[() => !!shopAddress || 'This field is required']"
                variant="outlined"
                required
              ></v-text-field>

              <v-text-field
                v-model="numOfEmp"
                density="compact"
                type="number"
                label="Enter your Number Of Employes"
                :rules="numberInputRules"
                variant="outlined"
                required
              ></v-text-field>
              <v-btn
                type="submit"
                :color="
                  !shopName ||
                  !shopEmail ||
                  !shopPhoneNumber ||
                  !shopWebsite ||
                  !shopAddress ||
                  !numOfEmp
                    ? '#808080'
                    : '#AE0000'
                "
                block
                :disabled="!isValidForm"
                class="mt-3"
                elevation="0"
              >
                <span style="color: white">Register</span></v-btn
              >
            </v-form>
          </v-sheet>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Navs/main-navbar.vue";
export default {
  name: "OnwerRegistration",
  components: {
    Nav,
  },
  data() {
    return {
      numOfEmp: null,
      shopAddress: null,
      shopWebsite: null,
      shopName: null,
      shopEmail: null,
      shopPhoneNumber: null,
      phoneRules: [
        (v) => !!v || "Phone number is required",
        (v) => /^\+\d+$/.test(v) || "Phone number must start with +",
      ],
      validURL(url) {
        const pattern =
          // eslint-disable-next-line no-useless-escape
          /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
        return pattern.test(url);
      },
    };
  },
  methods: {
    async register() {
      try {
        let data = {
          name: this.shopName,
          email: this.shopEmail,
          website: this.shopWebsite,
          numOfEmployees: this.numOfEmp,
          shopNumber: this.shopPhoneNumber,
          address: this.shopAddress,
        };
        const response = await this.$axios.post(
          `book-store/create-store-by-user-uuid/${this.$store.getters.user.uuid}`,
          data
        );
        if (response.data && response.data.success) {
          this.$store.dispatch("signUpSuccessBookStore", {
            storeUuid: response.data.data.bookStoreUuid,
            token: response.data.token,
          });
          this.$router.push({ name: "ownerDashboard" });
        } else {
          console.error("Failed to create bookStore record");
        }
      } catch (error) {
        console.error("Error creating bookStore record:", error);
      }
    },
  },
  computed: {
    numberInputRules() {
      return [
        (v) => !!v || "This field is required",
        (v) => !isNaN(parseFloat(v)) || "Only numeric values are allowed",
      ];
    },
    isValidEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.shopEmail);
    },
    isValidForm() {
      return (
        this.numOfEmp &&
        this.shopAddress &&
        this.shopWebsite &&
        this.shopName &&
        this.isValidEmail &&
        this.shopPhoneNumber
      );
    },
  },
};
</script>

<style scoped>
.main-div {
  background-color: #f3f0e9;
  font-weight: 700;
  text-align: center;
  color: #494949;
  height: 100vh;
}

@media (max-width: 992px) {
  .main-div {
    background-color: #f3f0e9;
    font-weight: 700;
    text-align: center;
    color: #494949;
    height: auto;
  }
}
</style>
