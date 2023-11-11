import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import router from './router';

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

const app = createApp(App);

app
  .use(vuetify)
  .use(router)
  .mount('#app');

app.config.globalProperties.$axios = axios;

loadFonts();