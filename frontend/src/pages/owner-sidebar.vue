<!-- Sidebar.vue -->

<template>
  <aside class="sidebar">
    <!-- Logo and Dashboard -->
    <div class="sidebar-header">
      <h1>Maktabti.jo</h1>
    </div>

    <!-- Menu items -->
    <ul class="menu-list">
      <li class="active">🏠 DashBoard</li>
      <li>📦 Orders</li>
      <li>📚 Products</li>
      <li>📈 Overview</li>
      <li>💬 Message</li>
      <li>⚙️ Settings</li>
    </ul>

    <!-- Upgrade Button -->
    <div class="upgrade-section">
      <img src="@/path-to-your-globe-image.png" alt="Globe icon" />
      <p>Unlock more information now <br> Upgrade to PRO</p>
      <button>Upgrade now</button>
    </div>

    <!-- Logout -->
    <button class="logout-btn">↩️ Logout</button>
  </aside>
</template>

<script>
export default {
  name: 'OwnerSidebar'
  // Any props, methods, or other options can go here
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100%;
  background-color: #FFF;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sidebar-header {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button {
  background: red;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
}

li {
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
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
  cursor: pointer;
}

.upgrade-section {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: auto;
}

.upgrade-section img {
  width: 40px;
  height: 40px;
}

.upgrade-section p {
  font-size: 14px;
  flex: 1;
}

.logout-btn {
  background: transparent;
  color: #333;
  border: none;
  cursor: pointer;
}
</style>
