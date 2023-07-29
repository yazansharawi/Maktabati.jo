<template>
      <div>
      <HomePage />
      </div>
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
body {
 font-family: 'Times New Roman';
}
</style>
