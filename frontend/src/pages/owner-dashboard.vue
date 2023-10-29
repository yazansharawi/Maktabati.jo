<template>
  <div class="dashboard-container">
    <OwnerSidebar />
    <div class="container my-4 main-content">
      <div class="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h4>DashBoard</h4>
        </div>
        <div class="d-flex">
          <div class="mr-4">
            <p>Total Sales</p>
            <h3>$5,100,00</h3>
          </div>
          <div class="mr-4">
            <p>Total Expenses</p>
            <h3>$4,000</h3>
          </div>
          <div class="mr-4">
            <p>Total Revenue</p>
            <h3>$500,000</h3>
          </div>
          <div>
            <p>Sales Analytics</p>
            <h3>5,987,375</h3>
          </div>
        </div>
      </div>

      <!-- Sales Overview Chart -->
      <div class="mb-5">
        <h5>Sales Overview</h5>
        <div class="p-4 border">
          Mock Sales Overview Graph
        </div>
      </div>

      <!-- Recent Orders Table -->
      <div>
        <h5>Recent Orders</h5>
        <table class="table table-bordered">
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
</template>

<script>
import OwnerSidebar from "./owner-sidebar.vue";

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
  }
}
</script>

<style scoped>
.dashboard-container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 20px;
  height: 100vh;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #f5f5f5;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.logo img {
  width: 100px;
  margin-bottom: 20px;
}

.nav-list {
  list-style-type: none;
  padding: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.icon-dashboard,
.icon-books,
.icon-users,
.icon-sales,
.icon-settings {
  /* Replace these with actual icons */
  width: 20px;
  height: 20px;
  display: inline-block;
  background-color: #ccc; /* Placeholder */
}

.nav-item.active {
  background-color: #cfcfcf;
  font-weight: bold;
}

.nav-item:hover {
  background-color: #e0e0e0;
}

.upgrade-btn {
  margin-top: auto;
  background-color: #ff4500;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.main-content {
  padding: 20px;
}
</style>
