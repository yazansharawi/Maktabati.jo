<template>
      <!-- <div> -->
      <!-- <HomePage /> -->
      <!-- <GetToKnowTheUser/> -->
      <OwnerDashboard/>
      <!-- <BookOverview/> -->
<<<<<<< HEAD
      <!-- <shopPage/> -->
      <OwnerDashboard/>
      <categoriesPage/>
      </div>
=======
      <!-- <shopPage/>
      <categoriesPage/> -->
      <!-- </div> -->
      <div>
			<router-view />
		</div>
>>>>>>> main
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
<<<<<<< HEAD
    OwnerDashboard
=======
>>>>>>> main
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
