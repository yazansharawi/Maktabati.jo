<template>
  <v-app>
    <v-main>
      <div>
      <HomePage />
      </div>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import HomePage from "./components/home-page.vue";

export default {
  name: "App",

  components: {
    HomePage,
  },
};
</script>
<style scoped>
div{
  background-color: #f3f0e9;
}
</style>
