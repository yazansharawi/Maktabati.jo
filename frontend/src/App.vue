<template>
      <div>
      <!-- <HomePage /> -->
      <!-- <GetToKnowTheUser/> -->
      <!-- <BookOverview/> -->
      <!-- <shopPage/> -->
      <!-- <categoriesPage/> -->
      <communityPage/>
      </div>
</template>

<script>
// import BookOverview from './pages/book-overview.vue';
// import HelloWorld from './components/HelloWorld.vue'
// import HomePage from "../src/pages/home-page.vue";
// import shopPage from '../src/pages/shop-page.vue';
// import categoriesPage from './pages/categories-page.vue';
// import GetToKnowTheUser from '../src/pages/User-presona.vue'
import communityPage from './pages/community-page.vue';
export default {
  name: "App",

  components: {
    // BookOverview,
    // GetToKnowTheUser,
    communityPage
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
