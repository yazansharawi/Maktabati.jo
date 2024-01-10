<template>
  <aside class="sidebar" :class="{ responsive: isResponsive }">
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
      <li
        @click="navigate('Dashboard')"
        :class="{ active: selectedSection === 'Dashboard' }"
      >
        🏠 Dashboard
      </li>
      <li
        @click="navigate('Orders')"
        :class="{ active: selectedSection === 'Orders' }"
      >
        📦 Orders
      </li>
      <li
        @click="navigate('Products')"
        :class="{ active: selectedSection === 'Products' }"
      >
        📚 Products
      </li>
      <li
        @click="navigate('Settings')"
        :class="{ active: selectedSection === 'Settings' }"
      >
        ⚙️ Settings
      </li>
      <li class="logout-btn" @click="logout">↩️ Logout</li>
    </ul>

    <!-- Menu items -->
    <ul class="menu-list" v-if="!isResponsive">
      <li
        @click="navigate('Dashboard')"
        :class="{ active: this.selectedSection === 'Dashboard' }"
      >
        🏠 Dashboard
      </li>
      <li
        @click="navigate('Orders')"
        :class="{ active: this.selectedSection === 'Orders' }"
      >
        📦 Orders
      </li>
      <li
        @click="navigate('Products')"
        :class="{ active: this.selectedSection === 'Products' }"
      >
        📚 Products
      </li>
      <li
        @click="navigate('Settings')"
        :class="{ active: this.selectedSection === 'Settings' }"
      >
        ⚙️ Settings
      </li>
      <li class="logout-btn" @click="logout">↩️ Logout</li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: "OwnerSidebar",
  data() {
    return {
      isResponsive: false,
      selectedSection: "",
    };
  },
  watch: {
    selectedSection(newSection, oldSection) {
      const oldSectionElement = this.$el.querySelector(
        `[data-section="${oldSection}"]`
      );
      if (oldSectionElement) {
        oldSectionElement.classList.remove("active");
      }

      const newSectionElement = this.$el.querySelector(
        `[data-section="${newSection}"]`
      );
      if (newSectionElement) {
        newSectionElement.classList.add("active");
      }
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch("logout");

      this.$router.push({ name: "logInPage" });
    },
    toggleResponsive() {
      this.isResponsive = !this.isResponsive;
    },
    navigate(section) {
      let routeName = "";
      switch (section) {
        case "Dashboard":
          routeName = "ownerDashboard";
          break;
        case "Orders":
          routeName = "Orders";
          break;
        case "Products":
          routeName = "OwnerProductPage";
          break;
        case "Settings":
          routeName = "bookStoreSetting";
          break;
        default:
          console.warn("Unknown section:", section);
          return;
      }
      this.selectedSection = section;
      this.$router.push({ name: routeName });
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 80%;
  height: 100%;
  background-color: #fff;
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
  background: #d32f2f !important;
  color: white !important;
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
    height: 15%;
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
