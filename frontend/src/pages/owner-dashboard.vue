<template>
  <div class="dashboard-container">
    <OwnerSidebar />
    <div class="container my-4 main-content">
      <div>
          <h4>DashBoard</h4>
      </div>
      <div class="d-flex justify-content-between align-items-center mb-5">
          <div class="cards">
            <h3>$5,100,00</h3>
            <p>Total Revenue</p>
          </div>
          <div class="cards ml-5 mr-5">
            <h3>$4,000</h3>
            <p>Total Expenses</p>
          </div>
          <div class="cards">
            <h3>$500,000</h3>
            <p>Total Profit</p>
          </div>
      </div>
      
      <div class="mb-5">
        <h5>Sales Overview</h5>
        <div class="sales-graph p-4">
          <!-- Bar Chart Canvas -->
          <canvas id="barChart" width="400" height="200"></canvas>
        </div>
      </div>

      <!-- Recent Orders Table -->
      <div class="mb-5">
        <h5>Recent Orders</h5>
        <div class="orders-table">
          <table>
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Product Name</th>
                <th>Date</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in recentOrders" :key="order.id">
                <td>{{ order.trackingID }}</td>
                <td>{{ order.productName }}</td>
                <td>{{ order.date }}</td>
                <td>{{ order.price }}</td>
                <td>{{ order.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Right Content -->
    <div class="container my-4 right-content">
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
    </div>
  </div>
</template>

<script>
import OwnerSidebar from "./owner-sidebar.vue";
import Chart from "chart.js/auto"; // Import Chart.js

export default {   
  data() {
    return {
      recentOrders: [
        { id: 1, trackingID: '#3212123', productName: 'Ego is the enemy', date: 'Dec 19,2023', price: '$80', status: 'Completed' },
        { id: 2, trackingID: '#3212123', productName: 'Ego is the enemy', date: 'Dec 19,2023', price: '$80', status: 'Completed' },
        { id: 3, trackingID: '#3212123', productName: 'Ego is the enemy', date: 'Dec 19,2023', price: '$80', status: 'Completed' },
      ]
    }
  },
  components: {
    OwnerSidebar
  },
mounted() {
    // Initialize and render the bar chart
    const barChartCtx = document.getElementById("barChart").getContext("2d");
    new Chart(barChartCtx, {
      type: "bar",
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "Monthly Sales",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            data: [65, 59, 80, 81, 56, 55, 40],
          },
        ],
      },
    });

    // Initialize and render line chart 1
    const lineChart1Ctx = document.getElementById("lineChart1").getContext("2d");
    new Chart(lineChart1Ctx, {
      type: "line",
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "Line Chart 1",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            data: [10, 20, 30, 40, 50, 60, 70],
          },
        ],
      },
    });

    // Initialize and render line chart 2
    const lineChart2Ctx = document.getElementById("lineChart2").getContext("2d");
    new Chart(lineChart2Ctx, {
      type: "line",
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "Line Chart 2",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            data: [30, 40, 50, 60, 70, 80, 90],
          },
        ],
      },
    });
  },
}
</script>

<style scoped>
.dashboard-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 20px;
  height: fit-content;
  background-color: #f4efe9;
}

.cards{
  background-color: white;
  padding: 10px 20px;
  width: 100%;
  border-radius: 10px;
}

.sales-graph{
  background-color: white;
  border-radius: 10px;
}

.orders-table{
  background-color: white;
  border-radius: 10px;
  width: 100%;
  padding: 15px 25px;
}

.orders-table table{
  width: 100%;
}

.orders-table table th,td{
  padding: 10px;
}

.analytics-graph, .product-graph{
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
    height: fit-content;
    background-color: #f4efe9;
    
  }
}
</style>
