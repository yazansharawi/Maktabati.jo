<template>
  <div class="dashboard-container">
    <OwnerSidebar />
    <div class="container my-4 main-content">
      <div>
        <h2>DashBoard</h2>
      </div>
      <div class="d-flex justify-content-between align-items-center mb-5">
        <div class="cards">
          <p>Expected Revenue for this month</p>
          <h4>
            {{
              this.$bookStoreTotalRevenue
                ? "$" + this.$bookStoreTotalRevenue
                : "No Data available"
            }}
          </h4>
        </div>
        <div class="cards ml-5 mr-5">
          <p>Total Book Rented at the moment</p>
          <h4>
            {{
              this.$bookStoreTotalRentedBooks
                ? this.$bookStoreTotalRentedBooks
                : "No Book Rented"
            }}
          </h4>
        </div>
        <div class="cards">
          <p>Total Book Sold</p>
          <h4>
            {{
              this.$bookStoreBookSoldLastMonth
                ? this.$bookStoreBookSoldLastMonth
                : "No Data available"
            }}
          </h4>
        </div>
      </div>

      <!-- <div class="mb-5">
        <h4>Sales Overview</h4>
        <div class="sales-graph p-4">
          <canvas id="barChart" width="400" height="200"></canvas>
        </div>
      </div> -->

      <!-- Recent Orders Table -->
      <div class="mb-5">
        <h4>Recent Orders (Last 7 days)</h4>
        <div class="orders-table">
          <table>
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in recentOrders" :key="order.id">
                <td>{{ order.orderId }}</td>
                <td>{{ order.book.title }}</td>
                <td>{{ order.book.price }}</td>
                <td>{{ order.orderStatus }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Right Content -->
    <!-- <div class="container my-4 right-content">
      <div class="mt-6 mb-5">
        <h5>Sales Analytics</h5>
        <div class="container analytics-graph">
          <canvas id="lineChart1" width="400" height="350"></canvas>
        </div>
      </div>
      <div class="mb-5">
        <h5>Number of Products</h5>
        <div class="container product-graph">
          <canvas id="lineChart2" width="400" height="350"></canvas>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import OwnerSidebar from "../components/owner-sidebar.vue";
// import Chart from "chart.js/auto";

export default {
  data() {
    return {
      recentOrders: [],
    };
  },
  components: {
    OwnerSidebar,
  },
  created() {
    this.getRecentOrders();
  },
  methods: {
    getRecentOrders() {
      this.$axios
        .get(
          `purchase/get-book-store-recent-orders-by-uuid/${this.$store.getters.storeUuid}`
        )
        .then(async (res) => {
          this.recentOrders = res.data.orders;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
  },
  // mounted() {
  //   const barChartCtx = document.getElementById("barChart").getContext("2d");
  //   new Chart(barChartCtx, {
  //     type: "bar",
  //     data: {
  //       labels: [
  //         "January",
  //         "February",
  //         "March",
  //         "April",
  //         "May",
  //         "June",
  //         "July",
  //       ],
  //       datasets: [
  //         {
  //           label: "Monthly Sales",
  //           backgroundColor: "rgba(75, 192, 192, 0.2)",
  //           borderColor: "rgba(75, 192, 192, 1)",
  //           borderWidth: 1,
  //           data: [65, 59, 80, 81, 56, 55, 40],
  //         },
  //       ],
  //     },
  //   });
  // },
};
</script>

<style scoped>
.dashboard-container {
  display: grid;
  grid-template-columns: 0.8fr 2fr;
  gap: 20px;
  height: 100vh;
  background-color: #f4efe9;
}

.cards {
  background-color: white;
  padding: 10px 20px;
  width: 100%;
  border-radius: 10px;
}

.sales-graph {
  background-color: white;
  border-radius: 10px;
}

.orders-table {
  background-color: white;
  border-radius: 10px;
  width: 100%;
  padding: 15px 25px;
}

.orders-table table {
  width: 100%;
}

.orders-table table th,
td {
  padding: 10px;
}

.analytics-graph,
.product-graph {
  background-color: white;
  border-radius: 10px;
}

.main-content {
  padding: 20px;
}

@media (max-width: 768px) {
  .dashboard-container {
    display: block;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 20px;
    height: 100vh;
    background-color: #f4efe9;
  }
}
</style>
