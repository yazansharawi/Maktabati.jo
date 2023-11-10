<template>
      <div>
      <!-- <HomePage /> -->
      <!-- <GetToKnowTheUser/> -->
      <!--loginPage/> -->
      <signupPage/>
      </div>
</template>

<script>
//import BookOverview from './pages/book-overview.vue';
//import loginPage from './pages/login-page.vue';
// import HelloWorld from './components/HelloWorld.vue'
// import HomePage from "../src/pages/home-page.vue";
// import GetToKnowTheUser from './components/User-presona.vue'
import signupPage from './pages/sign-up-page.vue';
export default {
  name: "App",

  components: {
    //BookOverview
    //loginPage
    // GetToKnowTheUser
    // HomePage
    signupPage
  },
};
</script>
<style>
div{
  font-family: "Times New Roman";
}
</style>
