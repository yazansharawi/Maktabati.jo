<!-- Sidebar.vue -->

<template>
  <aside class="sidebar" :class="{ 'responsive': isResponsive }">
    <!-- Logo and Dashboard -->
    <div class="sidebar-header">
      <h1>Maktabti.jo</h1>
    </div>

    <!-- Burger Menu Button -->
    <div class="burger-menu" @click="toggleResponsive">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>

    <!-- Responsive Dropdown List -->
    <ul class="responsive-menu-list" v-if="isResponsive">
      <li @click="navigate('Dashboard')">🏠 DashBoard</li>
      <li @click="navigate('Orders')">📦 Orders</li>
      <li @click="navigate('Products')">📚 Products</li>
      <li @click="navigate('Overview')">📈 Overview</li>
      <li @click="navigate('Message')">💬 Message</li>
      <li @click="navigate('Settings')">⚙️ Settings</li>
      <li @click="upgrade">🌟 Upgrade now</li>
      <li @click="logout">↩️ Logout</li>
    </ul>

    <!-- Menu items -->
    <ul class="menu-list" v-if="!isResponsive">
      <li class="active">🏠 DashBoard</li>
      <li>📦 Orders</li>
      <li>📚 Products</li>
      <li>📈 Overview</li>
      <li>💬 Message</li>
      <li>⚙️ Settings</li>
      <li class="upgrade-btn" @click="upgrade">🌟 Upgrade now</li>
      <li class="logout-btn" @click="logout">↩️ Logout</li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'OwnerSidebar',
  data() {
    return {
      isResponsive: false,
    };
  },
  methods: {
    toggleResponsive() {
      this.isResponsive = !this.isResponsive;
    },
    navigate(section) {
      // Add logic for navigating to the selected section
      console.log(`Navigating to ${section}`);
    },
    upgrade() {
      // Add logic for upgrade action
      console.log('Upgrade now clicked');
    },
    logout() {
      // Add logic for logout action
      console.log('Logout clicked');
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 80%;
  height: 100%;
  background-color: #FFF;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 0 20px 20px 0;
  position: relative;
}

.sidebar-header {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button,
.menu-list li {
  border: none;
  border-radius: 5px;
  padding: 10px 15px; /* Adjusted padding */
  cursor: pointer;
  font-weight: bold;
  text-align: left; /* Adjusted for better alignment */
}

button {
  background: red;
  color: white;
}

li.active {
  background: #d32f2f;
  color: white;
}

li:hover {
  background: #dd8585;
  color: white;
}

.menu-list {
  list-style-type: none;
  padding: 0;
  gap: 15px;
  display: flex;
  flex-direction: column;
}

.menu-list li {
  font-size: 16px;
}

.upgrade-btn,
.logout-btn {
  font-size: 16px;
  cursor: pointer;
  text-align: left; /* Adjusted for better alignment */
}

.responsive-menu-list {
  list-style-type: none;
  padding: 0;
  gap: 15px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 60px;
  right: 0;
  background: #fff;
  z-index: 1; /* Ensure the dropdown is above other content */
}

.responsive-menu-list li {
  font-size: 16px;
  padding: 10px 15px; /* Adjusted padding */
  cursor: pointer;
}

.responsive-menu-list li.active {
  background: #d32f2f;
  color: white;
}

.responsive-menu-list li:hover {
  background: #dd8585;
  color: white;
}

.burger-menu {
  display: none;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
}

.bar {
  width: 25px;
  height: 3px;
  background-color: #333;
  margin: 6px 0;
}

@media screen and (max-width: 768px) {
  .sidebar {
    border-radius: 0px;
    width: 100%;
    margin: 0;
  }

  .burger-menu {
    display: block;
  }

  .menu-list {
    display: none;
  }

  .responsive .menu-list {
    display: flex;
    flex-direction: column;
  }

  .responsive-menu-list {
    position: static;
    display: flex;
    flex-direction: column;
  }
}
</style>
