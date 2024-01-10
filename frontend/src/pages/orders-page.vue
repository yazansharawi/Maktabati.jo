<template>
  <div class="orders-page">
    <OwnerSidebar />
    <div class="container my-4 main-content">
      <div class="mb-3">
        <h2>Upcoming Orders</h2>
      </div>
      <div>
        <v-data-table
          :headers="headers"
          :items="orders"
          :items-per-page="orders.length"
          elevation="0"
        />
      </div>
    </div>
  </div>
</template>

<script>
import OwnerSidebar from "../components/owner-sidebar.vue";

export default {
  data() {
    return {
      orders: [],
      headers: [
        {
          title: "orderId",
          align: "start",
          value: "orderId",
        },
        { title: "orderStatus", value: "orderStatus" },
        { title: "paidAt", value: "paidAt" },
        { title: "paymentAmount", value: "paymentAmount" },
        { title: "paymentMethod", value: "paymentMethod" },
        { title: "paymentStatus", value: "paymentStatus" },
      ],
    };
  },
  components: {
    OwnerSidebar,
  },
  created() {
    this.getBookStoreProdcuts();
  },
  methods: {
    getBookStoreProdcuts() {
      this.$axios
        .get(
          `purchase/get-book-store-orders-by-store-uuid/${this.$store.getters.storeUuid}`
        )
        .then(async (res) => {
          this.orders = res.data.orders.map((order) => {
            return {
              ...order,
              paidAt: order.paidAt || "Not Paid Yet",
            };
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
  },
};
</script>

<style scoped>
.orders-page {
  display: grid;
  grid-template-columns: 1.2fr 3fr;
  gap: 20px;
  height: fit-content;
  background-color: #f4efe9;
  height: 100vh;
}

.main-content {
  padding: 20px;
}

.orders-table {
  background-color: white;
  border-radius: 10px;
  width: 100%;
  padding: 15px 25px;
  overflow-x: auto;
}

.orders-table table {
  width: 100%;
  border-collapse: collapse;
}

.orders-table table th,
.orders-table table td {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  text-align: left;
}

.orders-table table th {
  background-color: #f0f0f0;
}

@media (max-width: 768px) {
  .orders-page {
    display: block;
  }
}
</style>
