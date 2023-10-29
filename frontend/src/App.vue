<template>
      <div>
      <!-- <HomePage /> -->
      <!-- <GetToKnowTheUser/> -->
      <!-- <BookOverview/> -->
      <!-- <shopPage/> -->
      <OwnerDashboard/>
      <categoriesPage/>
      </div>
</template>

<script>
import OwnerDashboard from './pages/owner-dashboard.vue'
// import BookOverview from './pages/book-overview.vue';
// import HelloWorld from './components/HelloWorld.vue'
// import HomePage from "../src/pages/home-page.vue";
// import shopPage from '../src/pages/shop-page.vue';
// import categoriesPage from './pages/categories-page.vue';
// import GetToKnowTheUser from '../src/pages/User-presona.vue'
export default {
  name: "App",

  components: {
    // BookOverview,
    OwnerDashboard
    // GetToKnowTheUser
    // HomePage,
    // shopPage
    // categoriesPage
  },
};
</script>
<style>
div{
  font-family: "Times New Roman";
}
</style>
