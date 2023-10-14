<template>
   <div class="nav-container" :style="{ background: isMobile ? '#f3f0e9' : 'linear-gradient(to left, white 50%, #f3f0e9 50%)' }">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <div class="back_button">
              <v-icon size="2rem" color="white"
              >mdi-arrow-left</v-icon
            >
        </div>
        <button
          v-if="!isGetUserPage"
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          v-if="!isGetUserPage"
          class="collapse navbar-collapse NavElements"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item" v-for="item in navItems" :key="item.id">
              <a class="nav-link" :href="item.link">{{ item.label }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="red-div">
        <div class="white-circle" v-if="!isGetUserPage"></div>
      </div>
      <div class="right-angle-triangle"></div>
      <div class="left-angle-triangle"></div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      isMobile: false,
    };
  },
  props: {
    isGetUserPage: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    navItems() {
      let items = [
        { id: 1, label: "About", link: "" },
        { id: 2, label: "Topics", link: "" },
        { id: 3, label: "Author", link: "" },
        { id: 4, label: "Reviews", link: "" },
      ];

      if (this.isMobile) {
        items.push({ id: 6, label: "User Settings", link: "" });
      }

      return items;
    },
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
  methods: {
    checkScreenSize() {
      this.isMobile = window.innerWidth <= 992;
    },
  },
};
</script>

<style scoped>
.back_button {
  height: 50px;
  width: 50px;
  background-color: #ae0000;
  border-radius: 50%;
  display: flex;
  align-items: center; 
  justify-content: center;
  margin-right: 50px;
}
.nav-container {
padding:15px;
background: linear-gradient(to left, white 50%, #f3f0e9 50%);
}
.NavHeader {
  margin: 10px;
  padding-right: 30px;
  font-size: 25px;
  font-family: "Times New Roman";
  color: #494949;
  font-weight: 700;
}

.NavElements {
  color: #494949;
  padding-left: 10px;
  font-family: "Times New Roman";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
}

.NavElements a {
  text-decoration: none;
  color: #494949;
  margin-right: 15px;
}
.nav-search-field {
  margin-bottom: 10px;
  top: 0px;
  position: absolute;
  right: 220px;
  width: 300px;
  height: 30px;
}
.red-div {
  right: 70px;
  position: absolute;
  width: 50px;
  height: 95px;
  background-color: #ae0000;
  margin-left: 10px;
}
.right-angle-triangle {
  margin-top: 135px;
  position: absolute;
  right: 70px;
  border-width: 0 25px 40px 0;
  border-style: solid;
  border-color: transparent #ae0000 transparent transparent;
}
.left-angle-triangle {
  margin-top: 135px;
  position: absolute;
  right: 95px;
  border-width: 40px 25px 0 0;
  border-style: solid;
  border-color: #ae0000 transparent transparent transparent;
}
.white-circle {
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 20px;
  margin: 20px auto;
}
@media (max-width: 992px) {
  .centered-header {
    padding-top: 70px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .red-div,
  .right-angle-triangle,
  .left-angle-triangle {
    display: none;
  }
  .nav-search-field {
    position: static;
    margin-bottom: 40px;
    width: 90%;
  }
  .NavElements a {
    padding-right: 0;
    margin-bottom: 5px;
  }

  .NavElements {
    color: #494949;
    padding-left: 10px;
    font-family: "Times New Roman";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
  }
  .nav-container {
  background-color: white;
}
.back_button {
  height: 35px;
  width: 35px;
  background-color: #ae0000;
  border-radius: 50%;
  display: flex;
  align-items: center; 
  justify-content: center;
}
}
</style>
