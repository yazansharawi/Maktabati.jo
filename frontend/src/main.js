import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import router from './router';
import { genreOptions, authorOptions,questions,bookTypeOptions,bookAgeOptions,images } from '../src/constants.ts';


axios.defaults.baseURL = process.env.VUE_APP_API_URL;

const app = createApp(App);

app.config.globalProperties.$genreOptions = genreOptions;
app.config.globalProperties.$authorOptions = authorOptions; 
app.config.globalProperties.$questions = questions;
app.config.globalProperties.$bookTypeOptions = bookTypeOptions; 
app.config.globalProperties.$bookAgeOptions = bookAgeOptions; 
app.config.globalProperties.$images = images; 

app
  .use(vuetify)
  .use(router)
  .mount('#app');

app.config.globalProperties.$axios = axios;

loadFonts();