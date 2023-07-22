<template>
  <div class="nav-container" >
    <div class="NavHeader">Maktabti.jo</div>
    <div class="NavElements">
      <a href="">Home</a>
      <a href="">Shop</a>
      <a href="">Categories</a>
      <a href="">Community</a>
      <a href="">WishList</a>
      {{screenWidth}}
    </div>
    <div class="NavRight">
      <v-text-field
        class="nav-search-field"
        placeholder="Book Name"
        clearable
        variant="underlined"
        dense
        full-width
        hide-details
        single-line
        outlined
        background-color="white"
      >
        <v-icon size="1.2rem" class="mt-1 mr-2" color="#3C3C43">mdi-magnify</v-icon>
      </v-text-field>
    </div>
          <div class="red-div"></div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};

</script>

<style scoped>
.nav-container {
  background-color: #f3f0e9;
  overflow: hidden;
  display: flex;
}

.NavHeader {
  padding-right: 30px;
  margin: 20px;
  font-size: 25px;
  font-family: "Times New Roman";
  color: #494949;
  font-weight: 700;
}

.NavElements {
  margin-top: 25px;
  padding-left: 10px;
  font-family: "Times New Roman";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
}

.NavElements a {
  text-decoration: none;
  color: #494949;
  padding-right: 35px;
}

.NavRight {
  display: flex;
}
.nav-search-field {
  position: absolute;
  right: 220px;
  width: 300px;
  height: 30px;
}
.red-div {
  right:70px;
  position: absolute;
  width: 42px;
  height: 106px;
  background-color: #AE0000;
  margin-left: 10px; /* Adjust the margin as needed */
}
</style>
