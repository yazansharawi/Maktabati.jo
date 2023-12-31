<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500" height="auto">
      <v-card title="User Data">
        <div>
          <div class="main">
            <div class="textfield">
              <v-text-field
                v-model="userFirstName"
                density="compact"
                label="Update your First Name"
                :rules="[() => !!userFirstName || 'This field is required']"
                variant="outlined"
                required
                class="mt-3"
              />
              <v-text-field
                v-model="userLastName"
                density="compact"
                label="Update your Last Name"
                :rules="[() => !!userLastName || 'This field is required']"
                variant="outlined"
                required
                class="mt-3"
              />
            </div>
            <div class="textfield">
              <v-text-field
                v-model="userEmail"
                density="compact"
                label="Update your Email"
                :rules="[
                  () => !!userEmail || 'This field is required',
                  () =>
                    (userEmail && userEmail.includes('@')) ||
                    'Email must contain @',
                ]"
                variant="outlined"
                required
                class="mt-3"
              />
              <v-text-field
                v-model="userPhoneNumber"
                density="compact"
                label="Update your Phone Number"
                :rules="phoneRules"
                variant="outlined"
                required
                class="mt-3"
              />
            </div>
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Upate Data" @click="(dialog = false), updateData()" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "editUserDialog",

  data() {
    return {
      userFirstName: null,
      userLastName: null,
      userEmail: null,
      userPhoneNumber: null,
      phoneRules: [
        (v) => !!v || "Phone number is required",
        (v) => /^\+\d+$/.test(v) || "Phone number must start with +",
      ],
    };
  },
  created() {
    this.getUserInfo();
  },
  props: {
    model: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    dialog: {
      get() {
        return this.model;
      },
      set(value) {
        this.$emit("update:model", value);
      },
    },
  },
  methods: {
    getUserInfo() {
      this.$axios
        .get(`user/by-uuid/${this.$store.getters.user.uuid}`)
        .then(async (res) => {
          this.userFirstName = res.data.firstName;
          this.userLastName = res.data.lastName;
          this.userEmail = res.data.email;
          this.userPhoneNumber = res.data.phoneNumber;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    updateData() {
      let data = {
        firstName: this.userFirstName,
        lastName: this.userLastName,
        email: this.userEmail,
        phoneNumber: this.userPhoneNumber,
      };
      this.$axios
        .post(`user/update-by-uuid/${this.$store.getters.user.uuid}`, { data })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    closeDialog() {
      this.$emit("update:model", false);
    },
  },
};
</script>

<style scoped>
.image {
  display: flex;
  justify-content: center;
}
.textfield {
  width: 350px;
  justify-content: center;
}
.main {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
