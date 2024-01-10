<template>
  <div class="dashboard-container">
    <!-- Original Sidebar -->
    <OwnerSidebar />

    <!-- Main Content -->
    <v-container class="main-content">
      <div class="mb-3">
        <h2>Settings</h2>
      </div>

      <!-- Settings Fields -->
      <v-row class="mb-5">
        <!-- Store Name -->
        <v-col cols="12" md="6" class="mb-3">
          <v-card class="cards">
            <h3>{{ storeName ? storeName : "Error" }}</h3>
            <v-text-field v-model="storeName" label="Store Name"></v-text-field>
          </v-card>
        </v-col>

        <!-- Phone Number -->
        <v-col cols="12" md="6" class="mb-3">
          <v-card class="cards">
            <h3>{{ phoneNumber ? phoneNumber : "Error" }}</h3>
            <v-text-field
              v-model="phoneNumber"
              label="Phone Number"
            ></v-text-field>
          </v-card>
        </v-col>

        <!-- Email -->
        <v-col cols="12" md="6" class="mb-3">
          <v-card class="cards">
            <h3>{{ email ? email : "Error" }}</h3>
            <v-text-field v-model="email" label="Email"></v-text-field>
          </v-card>
        </v-col>

        <!-- Location -->
        <v-col cols="12" md="6" class="mb-3">
          <v-card class="cards">
            <h3>{{ location ? location : "Error" }}</h3>
            <v-text-field v-model="location" label="Location"></v-text-field>
          </v-card>
        </v-col>

        <v-col cols="12" md="6" class="mb-3 d-flex">
          <v-btn @click="saveChanges" color="#8B0000" bright bright-text
            >Save Changes</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import OwnerSidebar from "../components/owner-sidebar.vue";

export default {
  components: {
    OwnerSidebar,
  },
  created() {
    this.getShopInfo();
  },
  data() {
    return {
      storeName: null,
      phoneNumber: null,
      email: null,
      location: null,
    };
  },
  methods: {
    getShopInfo() {
      this.$axios
        .get(
          `book-store/get-book-store-setting-data-by-uuid/${this.$store.getters.storeUuid}`
        )
        .then(async (res) => {
          this.storeName = res.data.data.name;
          this.phoneNumber = res.data.data.shopNumber;
          this.email = res.data.data.email;
          this.location = res.data.data.address;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    saveChanges() {
      let data = {
        name: this.storeName,
        shopNumber: this.phoneNumber,
        email: this.email,
        address: this.location,
      };
      this.$axios
        .put(
          `book-store/update-book-store-data-by-store-uuid/${this.$store.getters.storeUuid}`,
          data
        )
        .then(async () => {
          this.getShopInfo();
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
  },
};
</script>

<style scoped>
/* Styles similar to the original design */
.dashboard-container {
  display: grid;
  grid-template-columns: 1.22fr 2fr 1fr;
  gap: 20px;
  background-color: #f4efe9;
  height: 100vh;
}

.cards {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.logo-preview {
  width: 100px;
  height: auto;
  margin: 10px auto;
}

@media (max-width: 768px) {
  .dashboard-container {
    display: block;
    height: 100vh;
  }

  .cards {
    margin-bottom: 20px;
  }
}
</style>
