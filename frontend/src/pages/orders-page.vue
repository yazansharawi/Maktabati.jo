<template>
    <div class="orders-page">
      <OwnerSidebar />
      <div class="container my-4 main-content">
        <div>
          <h4>Upcoming Orders</h4>
        </div>
        <div class="mb-5">
          <h5>All Upcoming Orders</h5>
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
                <tr v-for="order in upcomingOrders" :key="order.id">
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
    </div>
  </template>
  
  <script>
  import OwnerSidebar from "../components/owner-sidebar.vue";
  
  export default {
    data() {
      return {
        upcomingOrders: [
          {
            id: 1,
            trackingID: '#3212123',
            productName: 'Ego is the enemy',
            date: 'Dec 19, 2023',
            price: '$80',
            status: 'Pending' 
          },
          {
            id: 2,
            trackingID: '#5432556',
            productName: 'The Lean Startup',
            date: 'Dec 20, 2023',
            price: '$65',
            status: 'Processing' 
          },
          {
            id: 3,
            trackingID: '#8765123',
            productName: 'Atomic Habits',
            date: 'Dec 21, 2023',
            price: '$95',
            status: 'Pending' 
          },
          {
            id: 4,
            trackingID: '#1234567',
            productName: 'Deep Work',
            date: 'Dec 22, 2023',
            price: '$75',
            status: 'Shipped' 
          },
          {
            id: 5,
            trackingID: '#9876543',
            productName: 'Thinking, Fast and Slow',
            date: 'Dec 23, 2023',
            price: '$60',
            status: 'Pending' 
          },
          // Add more orders here as needed
        ],
      };
    },
    components: {
      OwnerSidebar,
    },
  };
  </script>
  
  <style scoped>
  .orders-page {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 20px;
    height: fit-content;
    background-color: #f4efe9;
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
  