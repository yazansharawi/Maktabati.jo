<template>
      <div>
      <!-- <HomePage /> -->
      <!-- <GetToKnowTheUser/> -->
      <BookOverview/>
      </div>
</template>

<script>
import BookOverview from './pages/book-overview.vue';
// import HelloWorld from './components/HelloWorld.vue'
// import HomePage from "../src/pages/home-page.vue";
// import GetToKnowTheUser from './components/User-presona.vue'
export default {
  name: "App",

  components: {
    BookOverview
    // GetToKnowTheUser
    // HomePage
  },
};
</script>
<style>
div{
  font-family: "Times New Roman";
}
</style>
