<template>
      <div>
      <HomePage />
      <!-- <GetToKnowTheUser/> -->
      </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import HomePage from "../src/pages/home-page.vue";
// import GetToKnowTheUser from './components/User-presona.vue'
export default {
  name: "App",

  components: {
    // GetToKnowTheUser
    HomePage
  },
};
</script>
<style>
div{
  font-family: "Times New Roman";
}
</style>
